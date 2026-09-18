/*
 * Illustrated destination scenes (inline SVG, no image files).
 *   Scene.render("temple") -> SVG markup string
 * Colours come from CSS custom properties set by a mood class on any ancestor
 * (see scenes.css): --sky1 --sky2 --sun --far --mid --near --ink --trim --water --leaf --strata
 * Animatable hooks: .sc-sun .sc-cloud .sc-water .sc-wave .sc-bird
 */
(function () {
  let uid = 0;
  const f = (v, fb) => `style="fill:var(--${v},${fb})"`;
  const s = (v, fb) => `style="stroke:var(--${v},${fb});fill:none"`;

  function frame(inner, extraDefs = "") {
    const id = "sc" + ++uid;
    return `<svg class="scene" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" style="stop-color:var(--sky1,#ff8a5b)"/><stop offset="1" style="stop-color:var(--sky2,#ffd98e)"/>
</linearGradient>${extraDefs}</defs>
<rect width="400" height="240" fill="url(#${id})"/>${inner}</svg>`;
  }

  const sun = (cx, cy, r) =>
    `<g class="sc-sun"><circle cx="${cx}" cy="${cy}" r="${r + 14}" ${f("sun", "#fff3b0")} opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${r}" ${f("sun", "#fff3b0")}/></g>`;

  const clouds = () =>
    `<g class="sc-cloud" opacity=".7"><ellipse cx="70" cy="46" rx="38" ry="9" fill="#fff" opacity=".55"/><ellipse cx="96" cy="40" rx="22" ry="8" fill="#fff" opacity=".55"/></g>
<g class="sc-cloud sc-cloud-b" opacity=".6"><ellipse cx="250" cy="30" rx="30" ry="7" fill="#fff" opacity=".5"/></g>`;

  const birds = (x, y) =>
    `<g class="sc-bird" ${s("ink", "#3a1030")} stroke-width="1.6" stroke-linecap="round"><path d="M${x} ${y} q5 -5 10 0 q5 -5 10 0"/><path d="M${x + 26} ${y - 10} q4 -4 8 0 q4 -4 8 0"/></g>`;

  function palm(x, y, k = 1) {
    return `<g transform="translate(${x} ${y}) scale(${k})" ${f("leaf", "#1f5c3a")}>
<path d="M-2 0 Q4 -30 0 -58 L4 -58 Q9 -30 3 0Z"/>
<path d="M2 -58 Q-22 -70 -36 -52 Q-18 -62 2 -56Z"/><path d="M2 -58 Q26 -72 40 -50 Q20 -62 2 -56Z"/>
<path d="M2 -58 Q-10 -84 -30 -82 Q-10 -76 2 -58Z"/><path d="M2 -58 Q14 -86 34 -80 Q14 -76 2 -58Z"/></g>`;
  }

  const pine = (x, y, h) =>
    `<path d="M${x} ${y - h} L${x + h * 0.32} ${y} L${x - h * 0.32} ${y}Z" ${f("leaf", "#1f5c3a")}/>`;

  // A gopuram whose base centre is at (0,0); place it with translate()/scale().
  function gopuram() {
    const tiers = [[50, -34], [42, -52], [34, -68], [25, -83], [16, -96], [9, -107]];
    let d = `<rect x="-54" y="-34" width="108" height="34" ${f("ink", "#7a1f3d")}/>`;
    for (let i = 0; i < tiers.length - 1; i++) {
      const [w, y] = tiers[i], [w2, y2] = tiers[i + 1];
      d += `<path d="M${-w} ${y} L${w} ${y} L${w2} ${y2} L${-w2} ${y2}Z" ${f("ink", "#7a1f3d")}/>`;
      d += `<rect x="${-w2 + 1}" y="${y2}" width="${2 * w2 - 2}" height="3" ${f("trim", "#f2b134")}/>`;
    }
    d += `<path d="M-14 -107 Q0 -122 14 -107Z" ${f("ink", "#7a1f3d")}/>`;
    d += `<g ${f("trim", "#f2b134")}><circle cx="-7" cy="-111" r="3"/><circle cx="0" cy="-115" r="3.4"/><circle cx="7" cy="-111" r="3"/></g>`;
    d += `<path d="M-10 0 V-18 Q0 -30 10 -18 V0Z" ${f("trim", "#f2b134")} opacity=".9"/>`;
    return d;
  }

  const scenes = {
    temple() {
      // Gopuram rising behind palms — Tirumala / Tirupati / Srikalahasti.
      return frame(`${sun(300, 78, 30)}${clouds()}${birds(90, 90)}
<path d="M0 176 Q70 146 140 166 T280 158 T400 170 V240 H0Z" ${f("far", "#e0735a")}/>
<g transform="translate(200 206)">${gopuram()}</g>
<path d="M0 204 H400 V240 H0Z" ${f("near", "#5b1636")}/>
${palm(48, 210, 1.1)}${palm(96, 214, 0.8)}${palm(342, 212, 1.05)}`);
    },

    tank() {
      // Kanipakam: gopuram above a stepped temple tank, reflected in the water.
      return frame(`${sun(92, 66, 24)}${clouds()}${birds(280, 60)}
<path d="M0 150 Q90 128 180 142 T400 138 V240 H0Z" ${f("far", "#e0735a")}/>
<g transform="translate(200 152) scale(.82)">${gopuram()}</g>
<rect x="0" y="150" width="400" height="12" ${f("near", "#5b1636")}/>
<rect x="0" y="162" width="400" height="78" ${f("water", "#1fb5c9")}/>
<g transform="translate(200 164) scale(.82 -.5)" opacity=".28">${gopuram()}</g>
<g class="sc-wave" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6">
<path d="M150 196 h30 M210 204 h40 M120 214 h24 M232 222 h30 M170 228 h26"/></g>
<path d="M0 162 H64 L18 240 H0Z" ${f("near", "#5b1636")}/><path d="M400 162 H336 L382 240 H400Z" ${f("near", "#5b1636")}/>
<g ${s("trim", "#f2b134")} stroke-width="2" opacity=".7">
<path d="M0 180 H53 M0 198 H42 M0 216 H31 M400 180 H347 M400 198 H358 M400 216 H369"/></g>`);
    },

    hilltemple() {
      // Ardhagiri: a small shrine and saffron flag on a hillock, steps climbing to it.
      return frame(`${sun(318, 72, 26)}${clouds()}${birds(90, 70)}
<path d="M0 160 Q80 132 150 150 Q260 124 400 150 V240 H0Z" ${f("far", "#6f7fbf")}/>
<path d="M50 240 Q120 150 186 108 Q208 96 232 108 Q300 150 370 240Z" ${f("mid", "#2f8a52")}/>
<path d="M205 240 L180 222 L222 204 L186 186 L226 168 L194 150 L222 134 L204 118 L210 108" ${s("trim", "#f2b134")} stroke-width="4" stroke-dasharray="3 4" stroke-linecap="round"/>
<ellipse cx="176" cy="122" rx="11" ry="3.5" ${f("water", "#bfeef5")}/>
<rect x="196" y="88" width="28" height="18" ${f("ink", "#3a1030")}/>
<path d="M194 88 L200 78 L220 78 L226 88Z M202 78 L206 70 L214 70 L218 78Z" ${f("ink", "#3a1030")}/>
<circle cx="210" cy="66" r="3.4" ${f("trim", "#f2b134")}/>
<rect x="206" y="94" width="8" height="12" ${f("trim", "#f2b134")}/>
<path d="M238 106 V64" stroke="var(--ink,#3a1030)" stroke-width="2"/>
<path class="sc-flag" d="M238 64 L262 71 L238 78Z" style="fill:var(--flag,#ff7a1a)"/>
<path d="M0 222 Q120 206 220 226 T400 220 V240 H0Z" ${f("near", "#154a2d")}/>
${pine(96, 214, 26)}${pine(126, 196, 22)}${pine(292, 196, 22)}${pine(322, 214, 28)}`);
    },

    shrine() {
      // Gudimallam: an old apsidal (elephant-back) village shrine with its flagstaff.
      return frame(`${sun(78, 76, 26)}${clouds()}
<path d="M0 176 Q100 156 200 170 T400 164 V240 H0Z" ${f("far", "#d8704f")}/>
<g transform="translate(-46 0)">
<rect x="186" y="176" width="152" height="24" ${f("ink", "#4a1a5c")}/>
<rect x="198" y="136" width="128" height="40" ${f("ink", "#4a1a5c")}/>
<g ${f("trim", "#f2b134")} opacity=".8"><rect x="226" y="140" width="4" height="34"/><rect x="258" y="140" width="4" height="34"/><rect x="290" y="140" width="4" height="34"/></g>
<path d="M194 136 V120 Q194 100 226 100 H292 Q330 100 330 124 V136Z" ${f("ink", "#4a1a5c")}/>
<rect x="194" y="132" width="136" height="5" ${f("trim", "#f2b134")}/>
<g ${f("trim", "#f2b134")}><circle cx="236" cy="97" r="3"/><circle cx="260" cy="95" r="3.4"/><circle cx="284" cy="97" r="3"/></g>
<path d="M204 176 V156 Q212 146 220 156 V176Z" ${f("trim", "#f2b134")}/>
<rect x="148" y="84" width="5" height="116" ${f("trim", "#f2b134")}/>
<rect x="141" y="80" width="19" height="6" ${f("trim", "#f2b134")}/><rect x="140" y="190" width="21" height="10" ${f("trim", "#f2b134")}/>
<g ${f("trim", "#f2b134")}><circle cx="143" cy="92" r="2.2"/><circle cx="158" cy="92" r="2.2"/></g>
</g>
<path d="M0 200 H400 V240 H0Z" ${f("near", "#2e0f3d")}/>
${palm(34, 212, 0.9)}${palm(368, 214, 0.95)}`);
    },

    canyon() {
      // Gandikota: red gorge, Penna river, fort wall on the rim.
      return frame(`${sun(200, 60, 24)}${clouds()}
<path d="M0 84 L58 88 L82 116 L112 124 L130 176 L150 240 H0Z" ${f("mid", "#c4452b")}/>
<path d="M400 76 L334 86 L300 112 L272 138 L256 188 L246 240 H400Z" ${f("mid", "#c4452b")}/>
<g ${s("strata", "#8e2a1a")} stroke-width="2" opacity=".55">
<path d="M0 118 L70 120 L104 140"/><path d="M0 150 L96 152 L120 176"/><path d="M0 186 L112 188 L134 212"/>
<path d="M400 112 L320 116 L288 138"/><path d="M400 146 L300 150 L270 176"/><path d="M400 184 L284 186 L262 212"/></g>
<path d="M150 240 Q186 208 172 182 Q160 158 196 144 Q226 132 214 116 L222 116 Q238 136 206 150 Q176 164 188 186 Q204 214 176 240Z" ${f("water", "#2aa7b8")}/>
<path d="M0 84 H70 V74 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 V84 H0Z" ${f("ink", "#6e1d12")}/>
<rect x="40" y="58" width="14" height="26" ${f("ink", "#6e1d12")}/><path d="M38 58 L47 48 L56 58Z" ${f("ink", "#6e1d12")}/>
${birds(260, 60)}`);
    },

    waterfall() {
      // Talakona: water dropping between forested cliffs.
      return frame(`${clouds()}
<path d="M0 60 Q40 44 90 56 Q140 40 176 58 L182 240 H0Z" ${f("mid", "#2f7d4f")}/>
<path d="M400 50 Q350 38 300 54 Q256 44 224 60 L218 240 H400Z" ${f("mid", "#2f7d4f")}/>
<path d="M176 58 L224 60 L220 204 L180 204Z" ${f("far", "#1e5a3a")}/>
<g class="sc-water"><rect x="184" y="60" width="32" height="146" ${f("water", "#bfeef5")} opacity=".95"/>
<g stroke="#fff" stroke-width="2" opacity=".85" stroke-dasharray="10 12"><path class="sc-flow" d="M190 60 V206"/><path class="sc-flow" d="M200 60 V206"/><path class="sc-flow" d="M210 60 V206"/></g></g>
<ellipse cx="200" cy="214" rx="70" ry="14" ${f("water", "#bfeef5")}/>
<g fill="#fff" opacity=".55"><circle cx="178" cy="206" r="9"/><circle cx="200" cy="202" r="12"/><circle cx="222" cy="206" r="9"/></g>
<path d="M0 222 Q100 208 200 228 T400 220 V240 H0Z" ${f("near", "#174a30")}/>
${pine(30, 64, 34)}${pine(62, 60, 28)}${pine(120, 56, 30)}${pine(290, 58, 30)}${pine(340, 52, 36)}${pine(376, 56, 26)}`);
    },

    mandapa() {
      // Lepakshi: pillared hall on a plinth, Nandi in front.
      let pillars = "";
      for (let i = 0; i < 6; i++) {
        const x = 118 + i * 34;
        pillars += `<rect x="${x}" y="112" width="12" height="62" ${f("ink", "#6b2a4a")}/><rect x="${x - 4}" y="108" width="20" height="7" ${f("trim", "#f2b134")}/><rect x="${x - 3}" y="140" width="18" height="5" ${f("trim", "#f2b134")} opacity=".8"/>`;
      }
      return frame(`${sun(78, 70, 26)}${clouds()}
<path d="M0 170 Q100 150 200 164 T400 158 V240 H0Z" ${f("far", "#d8704f")}/>
<path d="M98 108 L302 108 L292 94 L108 94Z" ${f("ink", "#6b2a4a")}/><rect x="96" y="104" width="208" height="6" ${f("trim", "#f2b134")}/>
${pillars}
<rect x="96" y="174" width="208" height="10" ${f("ink", "#6b2a4a")}/><rect x="86" y="184" width="228" height="10" ${f("ink", "#6b2a4a")}/>
<path d="M0 194 H400 V240 H0Z" ${f("near", "#4a1a36")}/>
<g ${f("trim", "#f2b134")}>
<ellipse cx="206" cy="216" rx="34" ry="11"/><ellipse cx="190" cy="204" rx="12" ry="9"/>
<path d="M178 202 Q164 200 160 212 Q160 222 172 222 Q180 218 182 208Z"/>
<path d="M166 203 q-4 -6 -2 -11 M175 202 q3 -6 1 -11" stroke="var(--trim,#f2b134)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M238 218 q10 -2 12 6" stroke="var(--trim,#f2b134)" stroke-width="2" fill="none"/></g>`);
    },

    hills() {
      // Horsley / Nallamala / Yelagiri: layered hills and a ghat road.
      return frame(`${sun(310, 84, 28)}${clouds()}${birds(120, 70)}
<path d="M0 140 Q80 96 150 124 Q220 90 300 118 Q360 98 400 112 V240 H0Z" ${f("far", "#6f7fbf")}/>
<path d="M0 170 Q70 132 140 158 Q230 124 320 156 Q370 142 400 150 V240 H0Z" ${f("mid", "#3f6f8f")}/>
<path d="M0 204 Q110 170 220 196 Q320 176 400 190 V240 H0Z" ${f("near", "#1f4a4f")}/>
<path d="M300 240 Q250 222 290 208 Q330 196 280 186 Q244 178 262 166" ${s("trim", "#f2b134")} stroke-width="3" stroke-dasharray="6 6"/>
<ellipse cx="96" cy="222" rx="46" ry="7" ${f("water", "#9fe3ef")} opacity=".8"/>
${pine(40, 206, 26)}${pine(58, 204, 20)}${pine(160, 200, 24)}${pine(360, 196, 28)}${pine(378, 198, 20)}`);
    },

    shore() {
      // Mahabalipuram: the Shore Temple's twin towers above the waves.
      const tower = (cx, base, w, h) => {
        let d = "";
        const steps = 5;
        for (let i = 0; i < steps; i++) {
          const ww = w * (1 - i / (steps + 1));
          const y = base - (h / steps) * (i + 1);
          d += `<rect x="${cx - ww / 2}" y="${y}" width="${ww}" height="${h / steps + 1}" ${f("ink", "#5a3a2e")}/>`;
          d += `<rect x="${cx - ww / 2}" y="${y}" width="${ww}" height="2" ${f("trim", "#f2b134")} opacity=".8"/>`;
        }
        return d + `<circle cx="${cx}" cy="${base - h - 4}" r="4" ${f("ink", "#5a3a2e")}/>`;
      };
      return frame(`${sun(88, 92, 26)}${clouds()}${birds(270, 56)}
<path d="M0 150 H400 V200 H0Z" ${f("water", "#1c8fb0")}/>
<g class="sc-wave" ${s("sky2", "#fff")} stroke-width="2" opacity=".7">
<path d="M-20 166 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/>
<path d="M-10 184 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/></g>
${tower(250, 190, 56, 96)}${tower(306, 190, 38, 60)}
<rect x="210" y="186" width="130" height="8" ${f("ink", "#5a3a2e")}/>
<path d="M0 196 Q120 186 220 196 T400 194 V240 H0Z" ${f("near", "#e9b872")}/>
${palm(372, 214, 0.9)}`);
    },

    fort() {
      // Gingee: boulder hill, fort wall climbing to the citadel; Arunachala behind.
      return frame(`${sun(320, 70, 24)}${clouds()}
<path d="M230 170 L300 92 L370 170Z" ${f("far", "#9a4a6a")} opacity=".8"/>
<path d="M0 240 V190 Q40 150 70 120 Q96 92 130 80 Q170 70 190 96 Q220 130 250 180 Q270 214 300 240Z" ${f("mid", "#8a4b2c")}/>
<g ${f("near", "#5e2f1c")} opacity=".6"><circle cx="80" cy="150" r="16"/><circle cx="120" cy="120" r="14"/><circle cx="170" cy="118" r="12"/><circle cx="200" cy="170" r="18"/><circle cx="140" cy="186" r="20"/></g>
<path d="M20 208 L60 170 L96 132 L128 100 L158 92" ${s("ink", "#3a1a12")} stroke-width="6" stroke-linejoin="round"/>
<path d="M20 208 L60 170 L96 132 L128 100 L158 92" ${s("trim", "#f2b134")} stroke-width="6" stroke-dasharray="3 5" opacity=".9"/>
<rect x="140" y="52" width="26" height="36" ${f("ink", "#3a1a12")}/><path d="M136 54 L153 30 L170 54Z" ${f("ink", "#3a1a12")}/>
<rect x="149" y="64" width="8" height="12" ${f("trim", "#f2b134")}/>
<path d="M0 216 Q160 204 400 222 V240 H0Z" ${f("near", "#5e2f1c")}/>
${palm(330, 226, 0.9)}${palm(372, 230, 0.7)}`);
    },
  };

  window.Scene = {
    render(type) {
      return (scenes[type] || scenes.hills)();
    },
    types: Object.keys(scenes),
  };
})();
