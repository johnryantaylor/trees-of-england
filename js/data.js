(function (root) {
  const GUIDE = {
    title: "Trees of England",
    subtitle: "A pocket key to trees growing wild",
    couplets: [
      {
        id: "start",
        prompt: "First look at the leaves — or the needles, if that is what the tree wears.",
        hint: "Choose the line that fits, then turn to the page named.",
        choices: [
          { text: "Leaves needle-like or scale-like; fruit a cone, or a berry-like cone. The conifers.", to: "c:conifer-form" },
          { text: "Leaves broad and flat, not needle-like. The broadleaves.", to: "c:broad-habit" }
        ]
      },
      {
        id: "conifer-form",
        prompt: "Are the leaves like overlapping scales, or like needles?",
        choices: [
          { text: "Leaves scale-like, overlapping, pressed to the shoot; foliage in flattened sprays.", to: "c:scale-underside" },
          { text: "Leaves needle-like, separate from one another.", to: "c:needle-arrangement" }
        ]
      },
      {
        id: "scale-underside",
        prompt: "Turn a spray over and look at the pale markings on the underside.",
        choices: [
          { text: "Underside marked with pale butterfly-shaped or hourglass patches; cones elongated, about 1 cm.", to: "s:western-red-cedar" },
          { text: "Underside marked with a pale X; cones small and globose.", to: "s:lawsons-cypress" }
        ]
      },
      {
        id: "needle-arrangement",
        prompt: "How are the needles borne on the shoot?",
        choices: [
          { text: "Needles in bundles or clusters of two or more from one point.", to: "c:bundles-persist" },
          { text: "Needles borne singly along the shoot.", to: "c:single-pegs" }
        ]
      },
      {
        id: "bundles-persist",
        prompt: "Do the needles stay on the tree in winter, or fall?",
        choices: [
          { text: "Needles in pairs, remaining all year. The pines.", to: "c:pines" },
          { text: "Needles in soft clusters of many on short pegs; the tree is deciduous and turns gold in autumn. The larches.", to: "c:larches" }
        ]
      },
      {
        id: "pines",
        prompt: "Compare the length of the needles and the colour of the bark.",
        choices: [
          { text: "Needles 3–7 cm, distinctly twisted, blue-green; bark of the upper trunk orange-red and flaking.", to: "s:scots-pine" },
          { text: "Needles 10–18 cm, flexible, dark grey-green; bark grey-brown in plates, never orange.", to: "s:corsican-pine" },
          { text: "Needles 4–7 cm, yellowish-green; small prickly cones often remaining closed on the tree for years.", to: "s:lodgepole-pine" }
        ]
      },
      {
        id: "larches",
        prompt: "Look at a ripe cone.",
        choices: [
          { text: "Cone egg-shaped, with scales lying flat; needles bright grass-green in summer.", to: "s:european-larch" },
          { text: "Cone with scales strongly curved outwards, like a little rosette; needles slightly bluish.", to: "s:japanese-larch" }
        ]
      },
      {
        id: "single-pegs",
        prompt: "Strip a few needles and feel the twig.",
        choices: [
          { text: "Needles sit on tiny woody pegs, so the twig feels rough when bare; needles more or less four-sided. The spruces.", to: "c:spruces" },
          { text: "Needles not on pegs; the twig is smoother, with round scars or only a slight swelling.", to: "c:not-spruce" }
        ]
      },
      {
        id: "spruces",
        prompt: "Are the needles painfully sharp, and what are the cones like?",
        choices: [
          { text: "Needles dark green, very sharp, 1–2 cm; hanging cones 10–15 cm with stiff scales.", to: "s:norway-spruce" },
          { text: "Needles bluish-green, flattened, less spiny, 1.5–3 cm; cones 6–10 cm with thin, wavy, papery scales.", to: "s:sitka-spruce" }
        ]
      },
      {
        id: "not-spruce",
        prompt: "Look at how the needles are grouped.",
        choices: [
          { text: "Needles in whorls of three, extremely sharp; fruit a glaucous, berry-like cone.", to: "s:juniper" },
          { text: "Needles not in threes.", to: "c:flat-needles" }
        ]
      },
      {
        id: "flat-needles",
        prompt: "Crush a few needles and look at the cones if they are present.",
        choices: [
          { text: "Needles of two obvious lengths, dark green above with two white bands beneath, citrus-scented; cones upright.", to: "s:grand-fir" },
          { text: "Not as above.", to: "c:hanging-or-yew" }
        ]
      },
      {
        id: "hanging-or-yew",
        prompt: "Which of these remaining conifers is yours?",
        choices: [
          { text: "Needles all around the shoot, sharp-pointed, fragrant; hanging cones with three-pronged bracts sticking out like a mouse’s hind legs.", to: "s:douglas-fir" },
          { text: "Needles of mixed lengths on feathery, drooping sprays; the leading shoot nods; small hanging cones.", to: "s:western-hemlock" },
          { text: "Needles flattened in two ranks, dark and flexible; fruit a single seed in a red fleshy cup. No woody cones. Poisonous.", to: "s:yew" }
        ]
      },
      {
        id: "broad-habit",
        prompt: "Are the leaves kept through the winter?",
        choices: [
          { text: "Leaves evergreen, thick and leathery, remaining green through winter.", to: "c:evergreen-broad" },
          { text: "Leaves deciduous, shed in autumn — or thin and not leathery.", to: "c:compound-or-simple" }
        ]
      },
      {
        id: "evergreen-broad",
        prompt: "Feel the leaf margin.",
        choices: [
          { text: "Leaves with sharp spines along the margin, glossy dark green.", to: "s:holly" },
          { text: "Leaves without spines.", to: "c:holm-or-box" }
        ]
      },
      {
        id: "holm-or-box",
        prompt: "Are the leaves opposite or alternate, and is there an acorn?",
        choices: [
          { text: "Leaves alternate, dark green, pale or whitish-felted beneath; fruit an acorn.", to: "s:holm-oak" },
          { text: "Leaves opposite, small (1–3 cm), oval, glossy, untoothed; a dense shrub or small tree of chalk slopes.", to: "s:box" }
        ]
      },
      {
        id: "compound-or-simple",
        prompt: "Is each leaf one blade, or several leaflets?",
        hint: "A compound leaf has a bud at the base of the whole stalk, not at the base of each leaflet.",
        choices: [
          { text: "Leaves compound — divided into separate leaflets.", to: "c:compound-arrange" },
          { text: "Leaves simple — one blade, though it may be lobed or toothed.", to: "c:simple-arrange" }
        ]
      },
      {
        id: "compound-arrange",
        prompt: "How are the compound leaves arranged on the twig?",
        choices: [
          { text: "Leaves in opposite pairs.", to: "c:opp-compound" },
          { text: "Leaves alternate, one after another.", to: "c:alt-compound" }
        ]
      },
      {
        id: "opp-compound",
        prompt: "Do the leaflets radiate from one point, or sit in pairs along a stalk?",
        choices: [
          { text: "Leaflets spreading from one point like fingers (palmate), usually 5–7.", to: "s:horse-chestnut" },
          { text: "Leaflets in pairs along a central stalk (pinnate).", to: "c:ash-or-elder" }
        ]
      },
      {
        id: "ash-or-elder",
        prompt: "Tree of the woods, or a pithy shrub of hedges?",
        choices: [
          { text: "A tree; leaflets 7–13, toothed; winter buds jet-black; fruit a bunch of hanging winged keys.", to: "s:ash" },
          { text: "A shrub or small tree with warty, pith-filled twigs; leaflets 5–7; creamy flower-umbels; clusters of black berries.", to: "s:elder" }
        ]
      },
      {
        id: "alt-compound",
        prompt: "Look for spines, a foul smell, or neither.",
        choices: [
          { text: "Twigs with a pair of spines at each leaf; leaflets oval, untoothed; hanging white pea-flowers; long dark pods.", to: "s:false-acacia" },
          { text: "Leaflets with 1–3 glandular teeth near the base; crushed foliage with a strong, unpleasant smell; seeds in twisted bunches of wings.", to: "s:tree-of-heaven" },
          { text: "Neither paired spines nor glandular teeth as above.", to: "c:walnut-or-rowan" }
        ]
      },
      {
        id: "walnut-or-rowan",
        prompt: "Crush a leaflet. Is it aromatic? And what is the fruit?",
        choices: [
          { text: "Leaflets aromatic when crushed; fruit a large green nut in a splitting husk.", to: "s:walnut" },
          { text: "Leaflets not aromatic; fruit a hanging cluster of orange-red berries.", to: "s:rowan" }
        ]
      },
      {
        id: "simple-arrange",
        prompt: "Are the simple leaves opposite or alternate?",
        choices: [
          { text: "Leaves in opposite pairs.", to: "c:opp-simple" },
          { text: "Leaves alternate.", to: "c:alt-simple" }
        ]
      },
      {
        id: "opp-simple",
        prompt: "Are the opposite leaves lobed, like a maple?",
        choices: [
          { text: "Leaves palmately lobed, maple-like.", to: "c:maple-group" },
          { text: "Leaves not lobed.", to: "c:opp-unlobed" }
        ]
      },
      {
        id: "maple-group",
        prompt: "Break a leaf-stalk. Is there milky sap?",
        choices: [
          { text: "Broken leaf-stalk yields milky sap; lobes ending in fine sharp points; winged seeds spread almost in a straight line.", to: "s:norway-maple" },
          { text: "No milky sap.", to: "c:field-or-large" }
        ]
      },
      {
        id: "field-or-large",
        prompt: "How large is the leaf?",
        choices: [
          { text: "Leaves small (4–8 cm), with rounded lobes, dull green; older twigs often with corky wings.", to: "s:field-maple" },
          { text: "Leaves larger (8–20 cm).", to: "c:sycamore-or-guelder" }
        ]
      },
      {
        id: "sycamore-or-guelder",
        prompt: "A tree of woods and streets, or a shrub of damp hedges?",
        choices: [
          { text: "A shrub of damp woods and hedges; leaves 3-lobed, irregularly toothed, with glands at the top of the stalk; berries red and translucent.", to: "s:guelder-rose" },
          { text: "A tree; leaves 5-lobed, coarsely toothed, dark green; hanging clusters of yellow-green flowers; winged seeds in a right-angled pair.", to: "s:sycamore" }
        ]
      },
      {
        id: "opp-unlobed",
        prompt: "Follow the side-veins of the leaf.",
        choices: [
          { text: "Side-veins curve to follow the leaf margin and run together toward the tip; leaves untoothed; twigs often red in winter.", to: "s:dogwood" },
          { text: "Veins not strongly curved in this way.", to: "c:privet-or-toothed" }
        ]
      },
      {
        id: "privet-or-toothed",
        prompt: "Are the leaves toothed?",
        choices: [
          { text: "Leaves small, lance-shaped, almost untoothed, somewhat leathery, often half-evergreen; black berries.", to: "s:wild-privet" },
          { text: "Leaves clearly toothed.", to: "c:spindle-or-wayfaring" }
        ]
      },
      {
        id: "spindle-or-wayfaring",
        prompt: "Look at the twigs and the underside of the leaf.",
        choices: [
          { text: "Twigs green and four-angled; leaves elliptic, finely toothed; fruit a four-lobed pink capsule with orange seeds.", to: "s:spindle" },
          { text: "Leaves wrinkled, grey-downy beneath, toothed; cream flowers in a flat head; berries oval, red then black.", to: "s:wayfaring-tree" }
        ]
      },
      {
        id: "alt-simple",
        prompt: "Are the alternate leaves distinctly lobed?",
        choices: [
          { text: "Leaves distinctly lobed.", to: "c:lobed-veins" },
          { text: "Leaves not lobed — though the margin may be toothed, wavy, or entire.", to: "c:unlobed-base" }
        ]
      },
      {
        id: "lobed-veins",
        prompt: "How do the main veins run?",
        choices: [
          { text: "Main veins spreading from the leaf base (palmate).", to: "c:palmate-lobed" },
          { text: "Main veins branching from a central midrib (pinnate), oak-like.", to: "c:oaks" }
        ]
      },
      {
        id: "palmate-lobed",
        prompt: "Look at the bark, the leaf underside, and any thorns.",
        choices: [
          { text: "Bark flaking in cream, grey and olive patches, like a map; fruits in hanging bristly balls; leaves maple-like but alternate.", to: "s:london-plane" },
          { text: "Leaves densely white or grey-felted beneath.", to: "c:white-grey-poplar" },
          { text: "Leaves green beneath (or only slightly pale), not densely felted.", to: "c:service-or-thorn" }
        ]
      },
      {
        id: "white-grey-poplar",
        prompt: "How white is the underside, and how deep the lobes?",
        choices: [
          { text: "Leaves deeply 3–5 lobed, maple-like, brilliant white-felted beneath; often suckering.", to: "s:white-poplar" },
          { text: "Leaves shallower-lobed or rounded, grey-felted beneath, less bright white.", to: "s:grey-poplar" }
        ]
      },
      {
        id: "service-or-thorn",
        prompt: "Is the twig thorny, and what is the fruit?",
        choices: [
          { text: "Unarmed tree; leaves maple-like with 5–9 triangular, sharply toothed lobes; fruit brown, speckled, olive-shaped.", to: "s:wild-service" },
          { text: "Leaves oval, shallowly lobed, grey-white felted beneath; orange-red berries.", to: "s:swedish-whitebeam" },
          { text: "Twigs thorny; leaves cut into 3–7 lobes.", to: "c:hawthorns" }
        ]
      },
      {
        id: "hawthorns",
        prompt: "How deeply are the leaves cut? (A hand-lens on the flower or fruit helps.)",
        choices: [
          { text: "Leaves deeply cut, usually more than halfway to the midrib; flowers with 1 style; fruit with 1 stone.", to: "s:hawthorn" },
          { text: "Leaves shallowly 3-lobed, cut less than halfway; flowers with 2–3 styles; fruit with 2–3 stones.", to: "s:midland-hawthorn" }
        ]
      },
      {
        id: "oaks",
        prompt: "Look at the base of the leaf and at the acorn-stalk.",
        choices: [
          { text: "Base of the leaf with a pair of small ear-like lobes (auricles) clasping the stalk; acorns on long stalks (2–8 cm).", to: "s:english-oak" },
          { text: "Leaf base tapering or wedge-shaped, without auricles.", to: "c:sessile-or-pointed" }
        ]
      },
      {
        id: "sessile-or-pointed",
        prompt: "Are the lobes rounded or pointed?",
        choices: [
          { text: "Lobes rounded; acorns sitting flush on the twig, or on a very short stalk.", to: "s:sessile-oak" },
          { text: "Lobes pointed.", to: "c:turkey-or-red" }
        ]
      },
      {
        id: "turkey-or-red",
        prompt: "Look at the lobe-tips and the acorn cup.",
        choices: [
          { text: "Each lobe with a long bristle-like whisker; acorn cup bristly, moss-like; leaves often with half-persistent brown stipules.", to: "s:turkey-oak" },
          { text: "Lobes bristle-tipped but not whiskered; large leaves that colour red in autumn; acorn cup shallow and smooth.", to: "s:red-oak" }
        ]
      },
      {
        id: "unlobed-base",
        prompt: "Compare the two sides of the leaf base.",
        choices: [
          { text: "Leaf base strongly asymmetrical — one side of the blade starts lower than the other.", to: "c:elm-or-lime" },
          { text: "Leaf base more or less symmetrical.", to: "c:shape-narrow" }
        ]
      },
      {
        id: "elm-or-lime",
        prompt: "Is there a long pale bract on the fruit-stalk?",
        choices: [
          { text: "Leaves rough above, sharply (often doubly) toothed; fruit a small winged disc. No heart-shaped bract.", to: "c:elms" },
          { text: "Leaves heart-shaped, softer, finely toothed; flowers and fruit hang from a long strap-like pale bract.", to: "c:limes" }
        ]
      },
      {
        id: "elms",
        prompt: "How large is the leaf, and where does the tree grow?",
        choices: [
          { text: "Leaves large (10–18 cm), very rough, with a short abrupt point; a tree of woods, hills and riverbanks.", to: "s:wych-elm" },
          { text: "Leaves smaller (5–10 cm); a suckering tree of hedges and old field boundaries, now often a row of dead or regenerating stems.", to: "s:english-elm" }
        ]
      },
      {
        id: "limes",
        prompt: "Feel the underside of the leaf, and note the size.",
        choices: [
          { text: "Leaves small (3–8 cm), hairless beneath except for tufts in the vein axils; flowers held somewhat upright.", to: "s:small-leaved-lime" },
          { text: "Leaves large (6–15 cm), softly hairy beneath all over; flowers hanging.", to: "s:large-leaved-lime" },
          { text: "Intermediate in size; often with suckers around the trunk; the common lime of streets and parks.", to: "s:common-lime" }
        ]
      },
      {
        id: "shape-narrow",
        prompt: "Is the leaf long and narrow, or broader?",
        choices: [
          { text: "Leaves at least three times as long as broad, lance-shaped.", to: "c:narrow-leaves" },
          { text: "Leaves broader — oval, round, diamond or heart-shaped.", to: "c:broad-unlobed" }
        ]
      },
      {
        id: "narrow-leaves",
        prompt: "Look at the teeth, the colour, and any thorns.",
        choices: [
          { text: "Leaves 12–20 cm, with spine-tipped teeth; nuts in a very spiny green husk.", to: "s:sweet-chestnut" },
          { text: "Leaves silvery-scaly on both sides, almost untoothed; twigs thorny; a shrub of coasts and dunes.", to: "s:sea-buckthorn" },
          { text: "Leaves finely toothed, green (sometimes silky), not silver-scaly; typically of rivers, osier beds and wet ground.", to: "c:narrow-willows" }
        ]
      },
      {
        id: "narrow-willows",
        prompt: "Snap a twig, and look at the breadth of the leaf.",
        choices: [
          { text: "Leaves very long and narrow (often 10–20 × 0.5–1.5 cm), silky beneath; a shrub of wetlands, once coppiced for baskets.", to: "s:osier" },
          { text: "Twigs snapping off very readily at the base with a clean crack; leaves lance-shaped, shining green, 8–15 cm.", to: "s:crack-willow" },
          { text: "Leaves lance-shaped, covered at least beneath with silky white hairs; shoots often silky too.", to: "s:white-willow" }
        ]
      },
      {
        id: "broad-unlobed",
        prompt: "Is the margin merely wavy, and are the buds long and pointed?",
        choices: [
          { text: "Margin wavy, not truly toothed; 5–9 pairs of side veins; long pointed buds; nuts in a bristly four-valved husk. Deep shade.", to: "s:beech" },
          { text: "Not beech.", to: "c:hornbeam-or-not" }
        ]
      },
      {
        id: "hornbeam-or-not",
        prompt: "Are the leaves sharply corrugated, like a washboard?",
        choices: [
          { text: "Leaves sharply and regularly double-toothed, strongly corrugated; fruit a small nut attached to a 3-lobed papery bract.", to: "s:hornbeam" },
          { text: "Not so.", to: "c:catkin-trees" }
        ]
      },
      {
        id: "catkin-trees",
        prompt: "Look at the bark of the trunk and upper limbs.",
        choices: [
          { text: "Bark peeling in thin papery layers, white, silver or pinkish-white at least on the upper trunk.", to: "c:birches" },
          { text: "Bark not white-peeling.", to: "c:alders-or-rest" }
        ]
      },
      {
        id: "birches",
        prompt: "Feel the twigs, and look at the leaf shape.",
        choices: [
          { text: "Leaves triangular to diamond-shaped, with a long point, hairless; twigs rough with small warts; bark bright silver-white with black diamond marks.", to: "s:silver-birch" },
          { text: "Leaves more rounded, often hairy on the veins beneath; twigs hairy, without warts; bark browner, less freely peeling.", to: "s:downy-birch" }
        ]
      },
      {
        id: "alders-or-rest",
        prompt: "Are there little woody ‘cones’ still on the tree?",
        choices: [
          { text: "Fruiting cones woody and persistent through winter; typically of wet ground, streamsides and marsh.", to: "c:alders" },
          { text: "No woody cones.", to: "c:aspen-or-rest" }
        ]
      },
      {
        id: "alders",
        prompt: "What is the shape of the leaf tip and base?",
        choices: [
          { text: "Leaves rounded, with a notched or blunt tip, dark green, sticky when young.", to: "s:alder" },
          { text: "Leaves pointed at the tip, grey-green, downy beneath.", to: "s:grey-alder" },
          { text: "Leaves distinctly heart-shaped at the base, glossy, pointed.", to: "s:italian-alder" }
        ]
      },
      {
        id: "aspen-or-rest",
        prompt: "Do the leaves tremble on flattened stalks?",
        choices: [
          { text: "Leaf-stalk long and strongly flattened; blade almost round with a sudden short point; leaves tremble in the slightest air.", to: "s:aspen" },
          { text: "Leaf-stalk not flattened, or leaves not round and trembling.", to: "c:poplar-or-rose" }
        ]
      },
      {
        id: "poplar-or-rose",
        prompt: "Is it a tall riverside poplar with triangular leaves?",
        choices: [
          { text: "Leaves triangular or diamond-shaped, finely toothed; tall trees of rivers, levels and roadsides.", to: "c:black-poplars" },
          { text: "Not a black poplar or its kin.", to: "c:pale-beneath" }
        ]
      },
      {
        id: "black-poplars",
        prompt: "Look at the crown.",
        choices: [
          { text: "Crown extremely narrow and columnar; all branches steeply upright.", to: "s:lombardy-poplar" },
          { text: "Crown broad.", to: "c:black-or-hybrid" }
        ]
      },
      {
        id: "black-or-hybrid",
        prompt: "Look at the bark of an old trunk.",
        choices: [
          { text: "Bark deeply rugged, with large bosses and burrs; a scarce native of floodplains.", to: "s:black-poplar" },
          { text: "Bark ridged but without great burrs; the common riverside poplar of England, a planted hybrid.", to: "s:hybrid-black-poplar" }
        ]
      },
      {
        id: "pale-beneath",
        prompt: "Is the leaf densely white or grey-felted beneath?",
        choices: [
          { text: "Leaves densely white- or grey-felted beneath.", to: "c:white-felted" },
          { text: "Leaves green on both sides, or only slightly paler beneath.", to: "c:green-both" }
        ]
      },
      {
        id: "white-felted",
        prompt: "A tree of chalk and limestone, or a shrubby willow?",
        choices: [
          { text: "A tree of limestone and chalk; leaves oval, irregularly toothed, white-felted beneath; berries orange-red with mealy flesh.", to: "s:whitebeam" },
          { text: "A shrubby willow; catkins appearing before the leaves, often furry.", to: "c:broad-willows" }
        ]
      },
      {
        id: "broad-willows",
        prompt: "Compare the width of the leaf.",
        choices: [
          { text: "Leaves broad-oval, almost as wide as long, with a slightly twisted point; the ‘pussy willow’ of early spring.", to: "s:goat-willow" },
          { text: "Leaves more oblong, wrinkled, dull grey-green, downy beneath; typically of wetter ground.", to: "s:grey-willow" }
        ]
      },
      {
        id: "green-both",
        prompt: "Do the twigs end in a stout thorn, and do white flowers appear before the leaves?",
        choices: [
          { text: "Twigs ending in a stout thorn; flowers appearing before the leaves, pure white; fruit a blue-black sloe with a bloom.", to: "s:blackthorn" },
          { text: "Not blackthorn.", to: "c:after-blackthorn" }
        ]
      },
      {
        id: "after-blackthorn",
        prompt: "Look at the flowers and the colour of the twigs.",
        choices: [
          { text: "Flowers with the leaves, white, sometimes on slightly thorny green twigs; fruit a yellow to red cherry-plum.", to: "s:cherry-plum" },
          { text: "Unarmed, or only with fruit-spur tips; fruit a cherry, apple, pear, nut, or small berry.", to: "c:cherry-to-rest" }
        ]
      },
      {
        id: "cherry-to-rest",
        prompt: "Is the fruit a cherry?",
        choices: [
          { text: "Fruit a cherry; leaves finely toothed, drawn out at the tip.", to: "c:cherries" },
          { text: "Fruit a small apple or pear, or a nut, or a small berry.", to: "c:apple-pear-nut" }
        ]
      },
      {
        id: "cherries",
        prompt: "How are the flowers arranged, and is the bark peeling?",
        choices: [
          { text: "Flowers in umbels of 2–6; two red glands on the leaf-stalk; bark peeling in mahogany bands.", to: "s:wild-cherry" },
          { text: "Flowers in long hanging racemes of many blossoms; bark darker, not peeling in bands.", to: "s:bird-cherry" }
        ]
      },
      {
        id: "apple-pear-nut",
        prompt: "Are there catkins and a frilled nut husk?",
        choices: [
          { text: "Leaves round to broadly oval, doubly toothed; yellow catkins before the leaves; nuts in a leafy, frilled husk.", to: "s:hazel" },
          { text: "Not hazel.", to: "c:apple-or-buckthorn" }
        ]
      },
      {
        id: "apple-or-buckthorn",
        prompt: "What is the fruit?",
        choices: [
          { text: "Fruit a small apple, yellow-green, often speckled, sour; twigs sometimes downy.", to: "s:crab-apple" },
          { text: "Fruit a small pear, tapering to the stalk; twigs often spiny; leaves glossy.", to: "s:wild-pear" },
          { text: "Fruit a small berry; neither apple nor pear.", to: "c:buckthorns" }
        ]
      },
      {
        id: "buckthorns",
        prompt: "Count the side-veins, and look for a thorn.",
        choices: [
          { text: "Leaves with 6–10 pairs of side veins, margin entire or nearly so; buds without scales (naked); wet, acid woods and bogs.", to: "s:alder-buckthorn" },
          { text: "Leaves toothed, with only 2–4 pairs of veins; some twigs ending in a thorn; calcareous hedges and scrub.", to: "s:purging-buckthorn" }
        ]
      }
    ],
    species: []
  };

  root.TREE_GUIDE = GUIDE;
  if (typeof module !== "undefined") module.exports = GUIDE;
})(typeof window !== "undefined" ? window : globalThis);
