(function (root) {
  const G = root.TREE_GUIDE;
  function sp(id, common, latin, family, status, height, extra) {
    return Object.assign({ id, common, latin, family, status, height }, extra);
  }

  G.species = [
    sp("western-red-cedar", "Western Red Cedar", "Thuja plicata", "Cupressaceae", "Introduced, now wild", "to 40 m+", {
      also: ["Giant Arbor-vitae"],
      plate: "cedar",
      leaf: "Scale-like, in flattened, slightly drooping sprays. The underside shows pale butterfly-shaped or hourglass marks.",
      bark: "Red-brown, fibrous, peeling in long vertical strips.",
      flower: "Inconspicuous; male and female cones on the same tree.",
      fruit: "Small elongated woody cones, about 1 cm, ripening brown.",
      habitat: "Plantations, churchyards, and large gardens; seedlings appear in woods nearby.",
      notes: "Crushed foliage smells sweetly of pineapple. A tree of the Pacific North-West, planted widely in England since the nineteenth century.",
      similar: ["lawsons-cypress"]
    }),
    sp("lawsons-cypress", "Lawson’s Cypress", "Chamaecyparis lawsoniana", "Cupressaceae", "Introduced, now wild", "to 40 m", {
      also: ["Port Orford Cedar"],
      plate: "cypress",
      leaf: "Scale-like, in flattened sprays. Underside with a pale X-shaped mark at the joint of the scales.",
      bark: "Red-brown to grey, fibrous, ridged on old trunks.",
      flower: "Male cones small, often pink or crimson at the tips of sprays in spring.",
      fruit: "Globose cones, 7–10 mm, with a spike on each scale.",
      habitat: "Plantations, shelterbelts, churchyards; regenerates in woodland and on waste ground.",
      notes: "Foliage smells of parsley when crushed. Many garden cultivars exist; the wilding form is usually a tall, narrow, dark tree.",
      similar: ["western-red-cedar"]
    }),
    sp("scots-pine", "Scots Pine", "Pinus sylvestris", "Pinaceae", "Native", "to 35 m", {
      plate: "pine-scots",
      leaf: "Needles in pairs, 3–7 cm, twisted, blue-green or glaucous.",
      bark: "Thick and grey-brown at the base; upper trunk and branches a distinctive orange-red, flaking in papery plates.",
      flower: "Male flowers yellow at the base of new shoots; female cones at the tips.",
      fruit: "Cones 3–7 cm, conical, grey-brown, the scales with a small prickle.",
      habitat: "Heath, sand, and poor soils; native in the Highlands and a few English relics, but planted throughout England and freely self-sown.",
      notes: "Our only native pine. Old trees are flat-topped, with a few heavy, twisting limbs — the ‘granny pine’ of paintings.",
      similar: ["corsican-pine", "lodgepole-pine"]
    }),
    sp("corsican-pine", "Corsican Pine", "Pinus nigra ssp. laricio", "Pinaceae", "Introduced, now wild", "to 40 m+", {
      also: ["Austrian Pine is the related ssp. nigra"],
      plate: "pine-black",
      leaf: "Needles in pairs, 10–18 cm, flexible, grey-green, less twisted than Scots Pine.",
      bark: "Grey to grey-brown, breaking into large plates. Never orange on the upper trunk.",
      flower: "As in other pines; pollen plentiful in early summer.",
      fruit: "Cones 5–8 cm, yellowish-brown, almost stalkless, held horizontally or pointing forward.",
      habitat: "Forestry plantations on sand, chalk and poor soils; occasional self-sown trees on heaths and dunes.",
      notes: "The usual ‘black pine’ of English forestry. Austrian Pine (ssp. nigra) is stiffer, darker, and more often a windbreak tree.",
      similar: ["scots-pine", "lodgepole-pine"]
    }),
    sp("lodgepole-pine", "Lodgepole Pine", "Pinus contorta", "Pinaceae", "Introduced, now wild", "to 25 m", {
      plate: "pine-lodgepole",
      leaf: "Needles in pairs, 4–7 cm, yellowish-green, often twisted.",
      bark: "Thin, grey-brown, small-scaled; not orange.",
      flower: "Typical pine flowers, rather early.",
      fruit: "Small cones, 3–6 cm, often lopsided, prickly, remaining closed on the tree for many years.",
      habitat: "Upland and western plantations, peat and poor soils; some natural regeneration.",
      notes: "Named for the poles of Plains Indian lodges. In England a forestry tree of wet, hungry ground where Scots Pine is less used.",
      similar: ["scots-pine", "corsican-pine"]
    }),
    sp("european-larch", "European Larch", "Larix decidua", "Pinaceae", "Introduced, now wild", "to 35 m", {
      plate: "larch-eu",
      leaf: "Needles in soft clusters of 30–40 on short shoots, bright grass-green, falling in autumn to leave knobbly twigs.",
      bark: "Pinkish-brown, later fissured.",
      flower: "Female flowers bright pink in spring, before the needles are fully out — a pretty sight.",
      fruit: "Egg-shaped cones, 2–4 cm, with scales lying neatly flat.",
      habitat: "Plantations, old parks, and hillsides; self-sown on light soils and railway banks.",
      notes: "The only common deciduous conifer of English woods besides its Japanese cousin. Autumn gold is unmistakable.",
      similar: ["japanese-larch"]
    }),
    sp("japanese-larch", "Japanese Larch", "Larix kaempferi", "Pinaceae", "Introduced, now wild", "to 30 m", {
      plate: "larch-jp",
      leaf: "Needles in clusters, slightly broader and more bluish-green than European Larch.",
      bark: "Redder, with looser plates.",
      flower: "Female flowers yellowish to greenish, less vividly pink.",
      fruit: "Cones with scales bent strongly outwards, so the ripe cone looks like a woody rosette.",
      habitat: "Forestry plantations, especially in the north and west; hybridises with European Larch (Dunkeld Larch).",
      notes: "If the cone scales curve back like little tongues, it is this species or the hybrid.",
      similar: ["european-larch"]
    }),
    sp("norway-spruce", "Norway Spruce", "Picea abies", "Pinaceae", "Introduced, now wild", "to 40 m+", {
      also: ["Christmas Tree"],
      plate: "spruce-norway",
      leaf: "Needles dark green, four-sided, very sharp, 1–2 cm, set on woody pegs.",
      bark: "Red-brown, later grey, small-scaled.",
      flower: "Male flowers yellowish; female cones upright at first, then hanging.",
      fruit: "Long hanging cones, 10–15 cm, with stiff, rhombic scales.",
      habitat: "Plantations throughout England; the traditional Christmas tree. Seedlings in woods and along rides.",
      notes: "Run a hand against the shoot — it hurts. Sitka is softer and bluer. Pegs remain on the twig after the needles fall.",
      similar: ["sitka-spruce"]
    }),
    sp("sitka-spruce", "Sitka Spruce", "Picea sitchensis", "Pinaceae", "Introduced, now wild", "to 40 m+", {
      plate: "spruce-sitka",
      leaf: "Needles flattened, bluish-green, 1.5–3 cm, less spiny than Norway Spruce, with two pale bands beneath.",
      bark: "Purplish-grey, peeling in round plates on old trees.",
      flower: "As other spruces.",
      fruit: "Cones 6–10 cm; scales thin, wavy and papery at the edge.",
      habitat: "The chief forestry spruce of western and upland Britain; some lowland plantations and self-sown trees.",
      notes: "A giant of Pacific shores. In England it likes rain. The papery cone-scales are the surest distinction from Norway Spruce.",
      similar: ["norway-spruce"]
    }),
    sp("juniper", "Juniper", "Juniperus communis", "Cupressaceae", "Native", "to 8 m, often a shrub", {
      plate: "juniper",
      leaf: "Needles in whorls of three, 8–20 mm, extremely sharp, with a broad white band above.",
      bark: "Red-brown, shredding in papery strips.",
      flower: "Dioecious — male and female on separate bushes. Tiny in spring.",
      fruit: "Berry-like cones, green then blue-black with a bloom, taking two years to ripen. The flavour of gin.",
      habitat: "Chalk downs, limestone, and a few southern heaths. Local and declining in England.",
      notes: "One of our three native conifers. Often no more than a prickly bush. Do not confuse with garden junipers of other species.",
      similar: ["yew"]
    }),
    sp("grand-fir", "Grand Fir", "Abies grandis", "Pinaceae", "Introduced, now wild", "to 50 m+", {
      plate: "fir",
      leaf: "Needles of two lengths, in two flattened ranks, dark green above, two white bands beneath. Crushed, they smell of oranges.",
      bark: "Smooth, grey-brown, with resin blisters when young; later fissured.",
      flower: "High in the crown.",
      fruit: "Upright cones, 5–10 cm, disintegrating on the tree so that you find scales on the ground, not whole cones.",
      habitat: "Plantations and large estates; occasional seedlings.",
      notes: "True firs have circular needle-scars and upright cones. Douglas Fir is not a true fir and has hanging cones with bracts.",
      similar: ["douglas-fir", "western-hemlock"]
    }),
    sp("douglas-fir", "Douglas Fir", "Pseudotsuga menziesii", "Pinaceae", "Introduced, now wild", "to 50 m+", {
      plate: "douglas",
      leaf: "Needles soft, 2–3.5 cm, all around the shoot, dark green, fragrant of resin and fruit when crushed.",
      bark: "Thick, corky, deeply fissured on old trees, often with resin seeps.",
      flower: "Inconspicuous.",
      fruit: "Hanging cones, 6–10 cm, with a three-pronged bract protruding from each scale — likened to the hind legs and tail of a mouse.",
      habitat: "Plantations, old parks, and western woods; some regeneration.",
      notes: "The mouse-tail bracts settle it. Named for David Douglas, who sent seed from the Pacific in the 1820s.",
      similar: ["grand-fir", "western-hemlock"]
    }),
    sp("western-hemlock", "Western Hemlock", "Tsuga heterophylla", "Pinaceae", "Introduced, now wild", "to 40 m+", {
      plate: "hemlock",
      leaf: "Needles of very mixed lengths, 5–20 mm, in feathery, flattened sprays, dark green with two white lines beneath.",
      bark: "Red-brown, russet, becoming fissured.",
      flower: "Tiny.",
      fruit: "Small hanging cones, 2–3 cm, plentiful even on young trees.",
      habitat: "Western and upland plantations; shade-tolerant seedlings under other conifers.",
      notes: "The leading shoot always nods, as if the tree were shy. Foliage is softer and more irregular than spruce or fir.",
      similar: ["grand-fir", "douglas-fir"]
    }),
    sp("yew", "Yew", "Taxus baccata", "Taxaceae", "Native", "to 20 m, often much broader than tall", {
      plate: "yew",
      leaf: "Needles flattened, in two ranks, 1–3 cm, dark green above, paler beneath, not white-banded like firs.",
      bark: "Red-brown, peeling in flakes; old trunks fluted and hollow.",
      flower: "Dioecious. Male trees shed clouds of pollen in late winter.",
      fruit: "A single seed half-sunk in a red, juicy aril. The aril is the only part that is not poisonous.",
      habitat: "Chalk and limestone woods, churchyards, old hedges. Ancient trees on village greens and in churchyards may be a thousand years old.",
      notes: "Every green part is highly poisonous to people and livestock. The red cup is eaten by birds, who pass the seed.",
      similar: ["holly", "grand-fir"]
    }),
    sp("holly", "Holly", "Ilex aquifolium", "Aquifoliaceae", "Native", "to 15 m", {
      plate: "holly",
      leaf: "Evergreen, glossy, wavy, with sharp spines — though leaves high in the crown, out of the reach of browsing beasts, are often almost entire.",
      bark: "Smooth, ash-grey, becoming finely fissured.",
      flower: "White, four-petalled, in May; male and female usually on separate trees.",
      fruit: "Scarlet berries on female trees, persisting into winter.",
      habitat: "Woods, hedges, and under-storey throughout England; especially on lighter soils.",
      notes: "A small tree or a shrub. Spiny leaves and red berries need no introduction, but spineless upper leaves sometimes puzzle.",
      similar: ["holm-oak"]
    }),
    sp("holm-oak", "Holm Oak", "Quercus ilex", "Fagaceae", "Introduced, now wild", "to 25 m", {
      also: ["Evergreen Oak", "Ilex Oak"],
      plate: "oak-holm",
      leaf: "Evergreen, leathery, dark green above, grey-felted beneath. Young leaves may be spiny, like holly; older ones usually untoothed.",
      bark: "Dark grey, small-plated, almost black on old trees.",
      flower: "Catkins in early summer.",
      fruit: "Acorns in a felted cup, ripening the first autumn.",
      habitat: "Parks, churchyards, coastal shelter, and self-sown in southern woods and streets. A tree of the Mediterranean, at home in the English south.",
      notes: "The dense, almost black crown is distinctive from a distance. Not a native oak, but thoroughly naturalised in the south and east.",
      similar: ["holly", "english-oak"]
    }),
    sp("box", "Box", "Buxus sempervirens", "Buxaceae", "Native", "to 8 m, usually a shrub", {
      plate: "box",
      leaf: "Opposite, evergreen, 1–3 cm, oval, glossy, untoothed, with a small notch at the tip.",
      bark: "Pale, corky, fissured on old stems.",
      flower: "Clusters of tiny yellow-green flowers in spring; no petals to speak of.",
      fruit: "A small three-horned capsule.",
      habitat: "Wild on a few chalk and limestone hills (Box Hill in Surrey is named for it). Also an ancient hedging plant, now escaped.",
      notes: "The hard yellow wood was used for engravings and mathematical instruments. Crushed leaves have a curious catty smell.",
      similar: ["wild-privet"]
    }),
    sp("horse-chestnut", "Horse Chestnut", "Aesculus hippocastanum", "Sapindaceae", "Introduced, now wild", "to 35 m", {
      plate: "horse-chestnut",
      leaf: "Palmate, with 5–7 large toothed leaflets from one point.",
      bark: "Grey-brown, scaly, often spirally plated on old trees.",
      flower: "Candles of white flowers with a yellow then pink blotch, in May.",
      fruit: "A spiny green husk hiding a large polished conker.",
      habitat: "Parks, village greens, roadsides; seedlings in waste ground and woods. A native of the Balkans, planted in England since the 1600s.",
      notes: "Winter buds are large, dark, and sticky. Leaf-mines now brown many leaves by August, but the tree is still unmistakable.",
      similar: ["sweet-chestnut"]
    }),
    sp("ash", "Ash", "Fraxinus excelsior", "Oleaceae", "Native", "to 35 m", {
      plate: "ash",
      leaf: "Opposite, pinnate, with 7–13 toothed leaflets.",
      bark: "Pale grey, smooth on young trees, later with an interwoven net of ridges.",
      flower: "Purple-black tufts before the leaves, in April. Some trees are male, some female, some mixed.",
      fruit: "Bunches of hanging winged keys, remaining into winter.",
      habitat: "Woods, hedges, and limestone throughout England. A tree of moist, fertile ground.",
      notes: "Winter twigs are pale grey with jet-black buds — a character worth learning. Ash dieback has killed many trees; look still for the keys and the black buds.",
      similar: ["rowan", "walnut"]
    }),
    sp("elder", "Elder", "Sambucus nigra", "Adoxaceae", "Native", "to 10 m", {
      plate: "elder",
      leaf: "Opposite, pinnate, 5–7 leaflets, unpleasantly scented when crushed.",
      bark: "Pale, corky, deeply furrowed, with prominent lenticels on young green-brown stems. Pith thick and white.",
      flower: "Flat creamy umbels in June, heavy-scented.",
      fruit: "Drooping clusters of black, juicy berries.",
      habitat: "Hedges, waste ground, rabbit warrens, and wood-edges — anywhere the soil is rich.",
      notes: "More shrub than tree, but old stools become tree-like. A plant of folklore and cordial. The pithy, warty twigs separate it from ash at a glance.",
      similar: ["ash", "rowan"]
    }),
    sp("false-acacia", "False Acacia", "Robinia pseudoacacia", "Fabaceae", "Introduced, now wild", "to 25 m", {
      also: ["Black Locust"],
      plate: "robinia",
      leaf: "Alternate, pinnate, 7–21 oval leaflets with smooth margins. A pair of spines at the base of each leaf on young shoots.",
      bark: "Grey-brown, deeply furrowed into a rope-like network.",
      flower: "Hanging racemes of white, scented pea-flowers in June.",
      fruit: "Flat dark pods, 5–10 cm, remaining in winter.",
      habitat: "Railway banks, waste ground, light soils in the south and east; suckers freely.",
      notes: "A North American tree, once planted for poles and for its flowers. The paired spines and entire leaflets distinguish it from ash and rowan.",
      similar: ["tree-of-heaven", "ash"]
    }),
    sp("tree-of-heaven", "Tree of Heaven", "Ailanthus altissima", "Simaroubaceae", "Introduced, now wild", "to 25 m", {
      plate: "ailanthus",
      leaf: "Very large pinnate leaves, 30–60 cm, with 13–25 leaflets. Each leaflet has 1–3 glandular teeth at the base. Crushed foliage smells of rancid peanut or burnt rubber.",
      bark: "Smooth, grey, with pale stripes, later shallowly fissured.",
      flower: "Small, greenish-white, in large clusters; male flowers especially ill-scented.",
      fruit: "Twisted bunches of winged seeds, pink then brown.",
      habitat: "Urban waste ground, railway land, and southern towns. An invasive tree of Chinese origin.",
      notes: "If a ‘sumach-like’ tree has appeared uninvited on a city wall, it is probably this. The glandular teeth are decisive.",
      similar: ["false-acacia", "ash"]
    }),
    sp("walnut", "Walnut", "Juglans regia", "Juglandaceae", "Introduced, now wild", "to 25 m", {
      plate: "walnut",
      leaf: "Pinnate, 5–9 (sometimes 13) leaflets, aromatic when crushed, the terminal leaflet the largest.",
      bark: "Smooth and grey when young, later with a pale, diamond-fissured network.",
      flower: "Male catkins; female flowers at the tips of shoots.",
      fruit: "A green husk around the familiar wrinkled nut.",
      habitat: "Old gardens, orchards, and roadsides; occasionally self-sown in the south.",
      notes: "Twigs have chambered pith if you slice them lengthwise. A Roman introduction, never quite a woodlander in England.",
      similar: ["ash", "rowan"]
    }),
    sp("rowan", "Rowan", "Sorbus aucuparia", "Rosaceae", "Native", "to 15 m", {
      also: ["Mountain Ash"],
      plate: "rowan",
      leaf: "Alternate, pinnate, 5–8 pairs of toothed leaflets plus a terminal one.",
      bark: "Smooth, silvery-grey, with horizontal lenticels, like a cherry.",
      flower: "Flat heads of creamy-white flowers in May.",
      fruit: "Dense hanging clusters of orange-red berries.",
      habitat: "Upland woods, moorland edges, and acid soils; also planted and bird-sown in towns.",
      notes: "Not an ash. The berries and the alternate leaves settle it. A tree of the hills, but happy wherever a thrush plants a seed.",
      similar: ["ash", "elder"]
    }),
    sp("norway-maple", "Norway Maple", "Acer platanoides", "Sapindaceae", "Introduced, now wild", "to 25 m", {
      plate: "maple-norway",
      leaf: "Opposite, palmately lobed, the lobes ending in fine sharp teeth. Broken stalks exude milky sap.",
      bark: "Grey, finely ridged, not flaking.",
      flower: "Bright yellow-green clusters, opening before the leaves in April.",
      fruit: "Winged keys, the two wings spread almost in a straight line (about 180°).",
      habitat: "Streets, parks, and woods; freely self-sown in lowland England.",
      notes: "The milky sap is the field test against sycamore. Autumn colour is a clear yellow, sometimes red.",
      similar: ["sycamore", "field-maple"]
    }),
    sp("field-maple", "Field Maple", "Acer campestre", "Sapindaceae", "Native", "to 15 m", {
      plate: "maple-field",
      leaf: "Small (4–8 cm), opposite, with 3–5 rounded lobes, dull green, downy beneath when young.",
      bark: "Grey-brown, fissured; older twigs often develop corky wings.",
      flower: "Yellow-green, with the leaves.",
      fruit: "Keys set almost in a straight line, the wings often flushed red.",
      habitat: "Hedges, woods, and woodland edges on the heavier, more lime-rich soils of lowland England.",
      notes: "Our only native maple. A modest tree, often trimmed in hedges, turning butter-yellow in autumn.",
      similar: ["sycamore", "norway-maple"]
    }),
    sp("guelder-rose", "Guelder Rose", "Viburnum opulus", "Adoxaceae", "Native", "to 4 m", {
      plate: "guelder",
      leaf: "Opposite, 3-lobed, maple-like, irregularly toothed, with a pair of glands at the top of the stalk.",
      bark: "Grey, slightly ridged. Twigs angled.",
      flower: "Flat ‘lace-cap’ heads: a ring of large sterile white flowers around tiny fertile ones.",
      fruit: "Translucent red berries in hanging clusters.",
      habitat: "Damp woods, hedges, and fens. A shrub that may be taken for a maple until it fruits.",
      notes: "Not a rose. The sterile outer flowers of the lace-cap are distinctive. Berries are bitter and not for eating.",
      similar: ["sycamore", "field-maple"]
    }),
    sp("sycamore", "Sycamore", "Acer pseudoplatanus", "Sapindaceae", "Introduced, now wild", "to 35 m", {
      plate: "sycamore",
      leaf: "Opposite, large, 5-lobed, coarsely toothed, dark green, the underside paler. No milky sap.",
      bark: "Grey, later flaking in irregular plates but not in the map-like patches of London Plane.",
      flower: "Hanging yellow-green tassels in May, with the leaves.",
      fruit: "Keys in a pair at about 90°.",
      habitat: "Woods, hedges, streets, and waste ground throughout England. A medieval introduction, now one of our commonest trees.",
      notes: "Seedlings carpet woodland floors. Tar-spot fungus makes black blotches on the leaves but does no real harm.",
      similar: ["norway-maple", "london-plane"]
    }),
    sp("dogwood", "Dogwood", "Cornus sanguinea", "Cornaceae", "Native", "to 4 m", {
      plate: "dogwood",
      leaf: "Opposite, oval, untoothed. The side-veins curve forward and run together toward the tip — a vein pattern worth learning.",
      bark: "Twigs red, especially in winter sun. Older bark grey.",
      flower: "Flat creamy heads in June.",
      fruit: "Small black berries.",
      habitat: "Hedges, scrub, and wood-edges on lime-rich soils.",
      notes: "A shrub of chalk and limestone. The red winter stems are the ‘dogwood’ of Christmas wreaths. Leaves turn plum-red in autumn.",
      similar: ["spindle", "wayfaring-tree"]
    }),
    sp("wild-privet", "Wild Privet", "Ligustrum vulgare", "Oleaceae", "Native", "to 4 m", {
      plate: "privet",
      leaf: "Opposite, lance-shaped, 2–6 cm, almost untoothed, somewhat leathery, often kept through winter in mild years.",
      bark: "Smooth, grey-brown.",
      flower: "Dense panicles of creamy, heavy-scented flowers in June–July.",
      fruit: "Shiny black berries, poisonous.",
      habitat: "Hedges, scrub, and woods on chalk and limestone.",
      notes: "The hedge privet of gardens is usually a Japanese species (L. ovalifolium), with broader leaves. This is the wild native of the downs.",
      similar: ["box", "spindle"]
    }),
    sp("spindle", "Spindle", "Euonymus europaeus", "Celastraceae", "Native", "to 6 m", {
      plate: "spindle",
      leaf: "Opposite, elliptic, finely toothed, 3–8 cm. Twigs green and clearly four-angled.",
      bark: "Grey-green, smooth.",
      flower: "Small, greenish-white, four-petalled, in May.",
      fruit: "A four-lobed, shocking-pink capsule that splits to show orange seeds — one of the brightest fruits in the winter hedge.",
      habitat: "Hedges and woods on lime-rich soil.",
      notes: "The hard wood was used for spindles and skewers. Autumn leaves turn a fine pink. Poisonous, despite the cheerful fruit.",
      similar: ["dogwood", "wayfaring-tree"]
    }),
    sp("wayfaring-tree", "Wayfaring Tree", "Viburnum lantana", "Adoxaceae", "Native", "to 5 m", {
      plate: "wayfaring",
      leaf: "Opposite, oval, toothed, wrinkled above, densely grey-downy beneath. No lobes.",
      bark: "Brown, becoming stringy. Twigs felted.",
      flower: "Domed cream heads in May, all flowers fertile (no lace-cap).",
      fruit: "Oval berries, red then black, in a mixed-colour bunch as they ripen.",
      habitat: "Chalk and limestone hedges and scrub, especially along old roads — hence the name.",
      notes: "A shrub of the wayfarer’s chalk cuttings. The wrinkled, felted leaves are unlike guelder rose, which is lobed.",
      similar: ["guelder-rose", "whitebeam"]
    }),
    sp("london-plane", "London Plane", "Platanus × hispanica", "Platanaceae", "Introduced, now wild", "to 40 m+", {
      also: ["Platanus × acerifolia"],
      plate: "plane",
      leaf: "Alternate (not opposite), palmately lobed, maple-like, the lobes rather triangular. The leaf-stalk base hides the bud.",
      bark: "Flaking in cream, grey, olive and brown patches — a living map. The surest character from across the street.",
      flower: "Inconspicuous, in hanging clusters.",
      fruit: "Bristly balls hanging on long stalks through winter.",
      habitat: "The plane of towns, squares, and river embankments. Rarely self-sown far from planting, but the tree most people in cities will try to name.",
      notes: "A hybrid of American and Oriental planes, planted because it bears smoke and pruning. Leaves are alternate, unlike sycamore.",
      similar: ["sycamore", "norway-maple"]
    }),
    sp("white-poplar", "White Poplar", "Populus alba", "Salicaceae", "Introduced, now wild", "to 20 m", {
      plate: "poplar-white",
      leaf: "Variable: the larger leaves deeply 3–5 lobed and maple-like, densely white-felted beneath. Leaves of the short shoots are more oval.",
      bark: "White to grey, with dark diamond lenticels; later dark and rugged at the base.",
      flower: "Catkins, the tree dioecious.",
      fruit: "Cotton-wool seeds from female trees, in early summer.",
      habitat: "Dunes, roadsides, and damp ground; suckers into thickets. A southern European tree, long planted.",
      notes: "From a distance the crown flashes white in the wind. Grey Poplar is duller and less deeply lobed.",
      similar: ["grey-poplar", "aspen"]
    }),
    sp("grey-poplar", "Grey Poplar", "Populus × canescens", "Salicaceae", "Introduced, now wild", "to 30 m", {
      plate: "poplar-grey",
      leaf: "Rounded to shallowly lobed, grey-felted beneath, less white and less maple-like than White Poplar.",
      bark: "Grey, with dark diamonds, later rugged.",
      flower: "Catkins; the common tree is often male.",
      fruit: "As other poplars, when female.",
      habitat: "River valleys, parks, and damp woods. A hybrid of White Poplar and Aspen, long established.",
      notes: "Often a tall, suckering tree of floodplains. If in doubt between this and White Poplar, look for deep maple-like lobes — those are White.",
      similar: ["white-poplar", "aspen"]
    }),
    sp("wild-service", "Wild Service Tree", "Sorbus torminalis", "Rosaceae", "Native", "to 20 m", {
      also: ["Chequers Tree"],
      plate: "service",
      leaf: "Maple-like, with 5–9 triangular, sharply toothed lobes, green beneath, turning copper and red in autumn.",
      bark: "Grey-brown, breaking into small square plates — rather like a pear.",
      flower: "White, in flat heads, in May–June.",
      fruit: "Brown, speckled, olive-shaped berries (chequers), edible when bletted.",
      habitat: "Ancient woods and old hedges on clay, especially in the south and east. A scarce indicator of old woodland.",
      notes: "A prize to find. The maple-like leaf on an alternate-leaved, unarmed tree is the clue; then look for the speckled brown fruit.",
      similar: ["sycamore", "swedish-whitebeam"]
    }),
    sp("swedish-whitebeam", "Swedish Whitebeam", "Sorbus intermedia", "Rosaceae", "Introduced, now wild", "to 15 m", {
      plate: "whitebeam-sw",
      leaf: "Oval, shallowly lobed, grey-white felted beneath. Intermediate between rowan and whitebeam in outline.",
      bark: "Grey, smooth, with lenticels.",
      flower: "White heads in May.",
      fruit: "Orange-red berries.",
      habitat: "Streets, parks, and bird-sown on waste ground and railway land. A Scandinavian tree, much planted.",
      notes: "Commoner in towns than the native whitebeam. The shallow lobes and grey underside distinguish it from rowan (pinnate) and hawthorn (thorny).",
      similar: ["whitebeam", "wild-service"]
    }),
    sp("hawthorn", "Hawthorn", "Crataegus monogyna", "Rosaceae", "Native", "to 10 m", {
      also: ["May", "Quickthorn", "Whitethorn"],
      plate: "hawthorn",
      leaf: "Deeply 3–7 lobed, usually cut more than halfway to the midrib, dull green.",
      bark: "Grey-brown, fissured. Twigs armed with true thorns.",
      flower: "White (rarely pink), five-petalled, with a single style, in May. Heavy-scented.",
      fruit: "Deep red haws, each with a single stone.",
      habitat: "Hedges, scrub, and woods throughout England. The backbone of the enclosure hedge.",
      notes: "If the leaf is deeply cut and the haw has one stone, it is this, the common hawthorn. Midland Hawthorn is a tree of heavier clays and old woods.",
      similar: ["midland-hawthorn", "blackthorn"]
    }),
    sp("midland-hawthorn", "Midland Hawthorn", "Crataegus laevigata", "Rosaceae", "Native", "to 8 m", {
      also: ["Woodland Hawthorn"],
      plate: "hawthorn-mid",
      leaf: "Shallowly 3-lobed, cut less than halfway to the midrib, glossier than common hawthorn.",
      bark: "Similar, with thorns.",
      flower: "Usually with 2–3 styles. Often a little earlier than common hawthorn.",
      fruit: "Haws with 2–3 stones.",
      habitat: "Ancient woods and old hedges on clay in the Midlands and south-east. Much less common than C. monogyna.",
      notes: "The two hawthorns hybridise. Count styles in flower, or stones in the haw, if the leaf-cut is ambiguous.",
      similar: ["hawthorn"]
    }),
    sp("english-oak", "English Oak", "Quercus robur", "Fagaceae", "Native", "to 40 m", {
      also: ["Pedunculate Oak"],
      plate: "oak-robur",
      leaf: "Lobed, with rounded sinuses, and a pair of small ear-like auricles at the base, clasping a short stalk.",
      bark: "Grey, thick, deeply fissured on old trees.",
      flower: "Catkins with the young leaves.",
      fruit: "Acorns on long stalks (peduncles), 2–8 cm. The cup is of small, neat scales.",
      habitat: "The oak of heavy lowland clays, old pasture woods, hedges, and parkland throughout England.",
      notes: "Auricles plus a long acorn-stalk: English Oak. No auricles and a sitting acorn: Sessile Oak. Hybrids are frequent where both grow.",
      similar: ["sessile-oak", "turkey-oak"]
    }),
    sp("sessile-oak", "Sessile Oak", "Quercus petraea", "Fagaceae", "Native", "to 40 m", {
      also: ["Durmast Oak"],
      plate: "oak-petraea",
      leaf: "Lobed, tapering to a wedge-shaped base on a longer leaf-stalk (1–2.5 cm). No auricles. Often more regular in outline than English Oak.",
      bark: "Similar, perhaps a little finer.",
      flower: "Catkins.",
      fruit: "Acorns sessile — sitting flush on the twig, or on a very short stalk.",
      habitat: "The oak of the north and west, of acid woods, hills, and lighter soils; also in the south on suitable ground.",
      notes: "The two native oaks meet and mix across England. Sessile Oak holds its leaves a little more neatly, on longer stalks, without the basal ears.",
      similar: ["english-oak"]
    }),
    sp("turkey-oak", "Turkey Oak", "Quercus cerris", "Fagaceae", "Introduced, now wild", "to 35 m", {
      plate: "oak-turkey",
      leaf: "Lobed, the lobes pointed and each tipped with a long bristle-like whisker. Narrow brown stipules often persist at the base of the leaf.",
      bark: "Grey, deeply fissured, rather rugged.",
      flower: "Catkins.",
      fruit: "Acorns in a bristly, moss-like cup. They take two years to ripen.",
      habitat: "Parks, roadsides, and self-sown in woods and heaths, especially in the south and east.",
      notes: "A fast-growing oak from south-eastern Europe. The whiskered lobes and mossy cup are unlike our native oaks.",
      similar: ["red-oak", "english-oak"]
    }),
    sp("red-oak", "Red Oak", "Quercus rubra", "Fagaceae", "Introduced, now wild", "to 30 m", {
      plate: "oak-red",
      leaf: "Large, with pointed bristle-tipped lobes (not long whiskers). Turns dull red to russet in autumn.",
      bark: "Smoothish, grey, with pale stripes when young; later shallowly ridged.",
      flower: "Catkins.",
      fruit: "Large acorns in a shallow, smooth saucer-like cup, ripening in the second year.",
      habitat: "Parks, forestry plots, and occasional self-sown trees in the south.",
      notes: "A North American oak, planted for autumn colour. The shallow acorn cup is quite unlike the mossy cup of Turkey Oak.",
      similar: ["turkey-oak"]
    }),
    sp("wych-elm", "Wych Elm", "Ulmus glabra", "Ulmaceae", "Native", "to 35 m", {
      plate: "elm-wych",
      leaf: "Large (10–18 cm), very rough above, doubly toothed, with a short abrupt point and a strongly asymmetrical base. Almost stalkless.",
      bark: "Grey, becoming rugged. Does not sucker as English Elm does.",
      flower: "Tufts of reddish flowers before the leaves, in early spring.",
      fruit: "A winged disc (samara) with the seed in the centre.",
      habitat: "Woods, riverbanks, and hills, especially in the north and west. The elm most likely to be found as a full tree since Dutch elm disease.",
      notes: "‘Wych’ means pliant, not witch. Dutch elm disease still kills many, but this species sets seed and is less dependent on suckers.",
      similar: ["english-elm"]
    }),
    sp("english-elm", "English Elm", "Ulmus minor", "Ulmaceae", "Native / long-established", "to 35 m (now usually a suckering hedge)", {
      also: ["Ulmus procera of older books"],
      plate: "elm-english",
      leaf: "Smaller than Wych Elm (5–10 cm), rounder, rough, asymmetrical at the base.",
      bark: "Deeply fissured. The tree suckers freely from roots.",
      flower: "Reddish tufts before the leaves.",
      fruit: "Winged discs, rather scarce — this elm spreads mostly by suckers.",
      habitat: "The elm of hedges and field boundaries in the English lowlands. Mature trees were devastated by Dutch elm disease; look now for suckering rows along old hedges, and the occasional surviving giant.",
      notes: "The taxonomy of English elms is a thicket of its own. For the pocket, a suckering hedgerow elm with small rough leaves is this.",
      similar: ["wych-elm"]
    }),
    sp("small-leaved-lime", "Small-leaved Lime", "Tilia cordata", "Malvaceae", "Native", "to 30 m", {
      plate: "lime-small",
      leaf: "Small (3–8 cm), heart-shaped, asymmetrical at the base, hairless beneath except for rusty tufts in the vein axils.",
      bark: "Grey, smooth then finely fissured. Few suckers.",
      flower: "Pale yellow, sweet-scented, held somewhat upright, in July. Bees adore them.",
      fruit: "Small nutlets hanging from a pale, strap-like bract.",
      habitat: "Ancient woods, especially on limestone; a tree of old coppice. Much less planted than Common Lime.",
      notes: "If the underside is smooth but for tufts in the corners of the veins, and the leaf is small, this is the native lime of wildwood.",
      similar: ["large-leaved-lime", "common-lime"]
    }),
    sp("large-leaved-lime", "Large-leaved Lime", "Tilia platyphyllos", "Malvaceae", "Native", "to 30 m", {
      plate: "lime-large",
      leaf: "Large (6–15 cm), heart-shaped, softly hairy beneath all over, not merely in tufts.",
      bark: "Grey, later rugged. Few suckers.",
      flower: "Hanging, in June, a little earlier than Small-leaved Lime.",
      fruit: "Ribbed nutlets on a bract.",
      habitat: "Woods on limestone, especially in the west and the Wye valley; also planted.",
      notes: "Our other native lime. Hairy beneath all over is the test. Common Lime, the street tree, is their hybrid and suckers freely.",
      similar: ["small-leaved-lime", "common-lime"]
    }),
    sp("common-lime", "Common Lime", "Tilia × europaea", "Malvaceae", "Introduced, now wild", "to 40 m", {
      also: ["Tilia × vulgaris"],
      plate: "lime-common",
      leaf: "Intermediate (6–10 cm), with tufts in the vein axils and some hairs on the veins. Often aphid-sticky in summer.",
      bark: "Grey; the trunk typically surrounded by a thicket of suckers.",
      flower: "Hanging, scented, in July.",
      fruit: "Slightly ribbed nutlets on a bract.",
      habitat: "Streets, parks, churchyards, and village avenues. The lime of towns. Occasional self-sown trees.",
      notes: "A hybrid of the two native limes, planted everywhere for its stature. If the bole is lost in suckers, it is almost certainly this.",
      similar: ["small-leaved-lime", "large-leaved-lime"]
    }),
    sp("sweet-chestnut", "Sweet Chestnut", "Castanea sativa", "Fagaceae", "Introduced, now wild", "to 30 m", {
      plate: "chestnut",
      leaf: "Long (12–20 cm), lance-shaped, with a regular row of spine-tipped teeth. Glossy, with prominent parallel side-veins.",
      bark: "Grey-brown; on old trees spiralling in deep furrows.",
      flower: "Long creamy catkins in July, smelling of toast.",
      fruit: "Edible nuts in a densely spiny green husk.",
      habitat: "Woods, old coppice, and parks, especially on sandy soils in the south. A Roman introduction, thoroughly at home.",
      notes: "Not related to Horse Chestnut. The long toothed leaf and the edible nut in a prickly bur are enough. Old coppice stools can be vast.",
      similar: ["horse-chestnut", "beech"]
    }),
    sp("sea-buckthorn", "Sea Buckthorn", "Hippophae rhamnoides", "Elaeagnaceae", "Native", "to 5 m", {
      plate: "sea-buckthorn",
      leaf: "Narrow, almost untoothed, silvery-scaly on both sides, 3–8 cm.",
      bark: "Brown. Twigs thorny.",
      flower: "Tiny, dioecious, before the leaves.",
      fruit: "Masses of orange berries on female bushes, remaining into winter.",
      habitat: "Sand dunes and sea-cliffs of the east coast; widely planted for dune-fixing and now thicket-forming, sometimes inland.",
      notes: "Unmistakable when in fruit. A native of the coast, but many inland stands are planted. The silver scales catch the light.",
      similar: ["osier", "purging-buckthorn"]
    }),
    sp("osier", "Osier", "Salix viminalis", "Salicaceae", "Native", "to 8 m", {
      also: ["Common Osier"],
      plate: "willow-osier",
      leaf: "Very long and narrow, 10–20 cm × 0.5–1.5 cm, dark green above, silky beneath. The willow of the basket-maker.",
      bark: "Yellow-brown to olive. Long, straight coppice rods.",
      flower: "Catkins before or with the leaves.",
      fruit: "Capsules with cottony seed.",
      habitat: "Wetlands, osier beds, riverbanks, and old withy holts.",
      notes: "If the leaf is as narrow as a grass-blade for a willow, it is this or one of its hybrids. Coppiced stools were once a crop.",
      similar: ["white-willow", "crack-willow"]
    }),
    sp("crack-willow", "Crack Willow", "Salix × fragilis", "Salicaceae", "Long-established", "to 20 m", {
      plate: "willow-crack",
      leaf: "Lance-shaped, 8–15 cm, shining green above, paler beneath, finely toothed.",
      bark: "Dull grey, thick, deeply fissured. Crown often leaning, with broken limbs.",
      flower: "Catkins with the leaves.",
      fruit: "Cotton-wool seed from female trees.",
      habitat: "Rivers, mill-streams, and wet meadows. The pollarded willow of English watersides.",
      notes: "Twigs snap off cleanly at the base with a sharp crack — hence the name. Most English crack willows are a sterile male hybrid, spread by broken twigs taking root.",
      similar: ["white-willow", "osier"]
    }),
    sp("white-willow", "White Willow", "Salix alba", "Salicaceae", "Native", "to 25 m", {
      plate: "willow-white",
      leaf: "Lance-shaped, 5–10 cm, covered at least beneath with silky white hairs, so the tree looks silvery in the wind.",
      bark: "Grey, fissured. Twigs silky when young, not brittle.",
      flower: "Catkins.",
      fruit: "Cotton-wool seed.",
      habitat: "Rivers, flood meadows, and wet ground. Cricket-bat willow is a female variety of this species.",
      notes: "Silky leaves and non-snapping twigs separate it from Crack Willow. A tall, pale tree of the levels.",
      similar: ["crack-willow", "osier"]
    }),
    sp("beech", "Beech", "Fagus sylvatica", "Fagaceae", "Native", "to 40 m", {
      plate: "beech",
      leaf: "Oval, pointed, with a wavy untoothed margin and 5–9 pairs of side veins. Fresh green in spring, often with silky hairs; a rich copper in autumn. Some leaves hang on young trees through winter.",
      bark: "Smooth, pale grey, like an elephant’s hide, even on old trees.",
      flower: "Inconspicuous, with the leaves.",
      fruit: "Two triangular nuts in a bristly four-valved husk (mast).",
      habitat: "Woods on chalk, limestone, and well-drained soils; also planted everywhere. The tree of the downs and of deep shade.",
      notes: "Winter buds are long, slender, and pointed — a good character. Nothing much grows under a dense beech canopy.",
      similar: ["hornbeam", "wych-elm"]
    }),
    sp("hornbeam", "Hornbeam", "Carpinus betulus", "Betulaceae", "Native", "to 25 m", {
      plate: "hornbeam",
      leaf: "Oval, sharply and regularly double-toothed, strongly corrugated (the veins sunken, the leaf looking pleated).",
      bark: "Grey, smooth, with a muscular, fluted bole — as if the tree were tensed.",
      flower: "Catkins.",
      fruit: "A small nut attached to a three-lobed papery bract, in hanging clusters.",
      habitat: "Woods of the south-east, especially on clay; old coppice. Planted as a hedging tree (it holds brown leaves in winter, like beech).",
      notes: "Often taken for beech. Beech is wavy-edged and smooth; hornbeam is sharply toothed and corrugated, with a sinewy trunk.",
      similar: ["beech", "wych-elm"]
    }),
    sp("silver-birch", "Silver Birch", "Betula pendula", "Betulaceae", "Native", "to 25 m", {
      plate: "birch-silver",
      leaf: "Triangular to diamond-shaped, with a long point, double-toothed, hairless.",
      bark: "White, peeling, with black diamond-shaped marks and rugged black bark at the base of old trees. Twigs hanging, rough with small warts (feel them).",
      flower: "Male catkins hanging, female smaller and upright at first.",
      fruit: "Tiny winged seeds from crumbling catkins in late summer.",
      habitat: "Heath, sand, woods, and waste ground throughout England. A pioneer on bare land.",
      notes: "Warty twigs and a long-pointed leaf: Silver Birch. Hairy twigs and a rounder leaf: Downy Birch. Hybrids occur.",
      similar: ["downy-birch"]
    }),
    sp("downy-birch", "Downy Birch", "Betula pubescens", "Betulaceae", "Native", "to 20 m", {
      plate: "birch-downy",
      leaf: "More rounded, with a shorter point, often hairy on the veins beneath.",
      bark: "White to brownish, peeling less freely, usually without the bold black diamonds of Silver Birch. Twigs hairy, without warts, not hanging.",
      flower: "Catkins, as in Silver Birch.",
      fruit: "Tiny winged seeds.",
      habitat: "Wetter, more peaty ground than Silver Birch — bogs, moorland edges, and upland woods. Also in the lowlands on damp soils.",
      notes: "A tree of the moss and the moss-edge. If the twigs are downy and the site is wet, prefer this name.",
      similar: ["silver-birch"]
    }),
    sp("alder", "Alder", "Alnus glutinosa", "Betulaceae", "Native", "to 20 m", {
      also: ["Common Alder", "Black Alder"],
      plate: "alder",
      leaf: "Rounded, dark green, sticky when young, with a notched or blunt tip — unusual among trees.",
      bark: "Dark grey-brown, fissured into square plates. Young twigs with orange lenticels.",
      flower: "Male catkins long and hanging in late winter; female catkins small and reddish.",
      fruit: "Woody cones, 1–2 cm, remaining on the tree through winter.",
      habitat: "Streams, rivers, marshes, and wet woods throughout England.",
      notes: "The notched leaf-tip and the little cones are enough. Roots bear nitrogen-fixing nodules, so alder can colonise raw wet ground.",
      similar: ["grey-alder", "italian-alder"]
    }),
    sp("grey-alder", "Grey Alder", "Alnus incana", "Betulaceae", "Introduced, now wild", "to 20 m", {
      plate: "alder-grey",
      leaf: "Pointed, grey-green, downy beneath, not sticky, the tip not notched.",
      bark: "Smooth, grey, remaining so longer than Common Alder.",
      flower: "Catkins, earlier than Common Alder.",
      fruit: "Woody cones, slightly larger.",
      habitat: "Planted on reclaimed land, river works, and upland sites; some regeneration.",
      notes: "A tree of the Continent, used for land reclamation. Pointed, downy leaves distinguish it at once from our native alder.",
      similar: ["alder", "italian-alder"]
    }),
    sp("italian-alder", "Italian Alder", "Alnus cordata", "Betulaceae", "Introduced, now wild", "to 20 m", {
      plate: "alder-italian",
      leaf: "Bright green, glossy, distinctly heart-shaped at the base, pointed at the tip.",
      bark: "Grey-brown, finely fissured.",
      flower: "Catkins in late winter.",
      fruit: "Woody cones, rather large (2–3 cm).",
      habitat: "Streets, parks, and damp roadsides; occasional self-sown trees in the south.",
      notes: "The heart-shaped, shining leaf is quite unlike Common Alder. A neat tree, much planted in towns.",
      similar: ["alder", "grey-alder"]
    }),
    sp("aspen", "Aspen", "Populus tremula", "Salicaceae", "Native", "to 20 m", {
      plate: "aspen",
      leaf: "Almost round, with a sudden short point and a coarsely toothed margin. The stalk is long and strongly flattened, so the blade trembles in the slightest air.",
      bark: "Smooth, grey-green, with diamonds; later darker.",
      flower: "Woolly catkins in early spring, before the leaves. Dioecious.",
      fruit: "Cotton-wool seed from female clones.",
      habitat: "Woods, heaths, and damp ground; spreading by suckers into groves of one clone.",
      notes: "You hear aspen before you name it. The flattened stalk is the mechanical trick of the trembling leaf.",
      similar: ["white-poplar", "grey-poplar"]
    }),
    sp("lombardy-poplar", "Lombardy Poplar", "Populus nigra ‘Italica’", "Salicaceae", "Introduced, now wild", "to 30 m", {
      plate: "poplar-lombardy",
      leaf: "Triangular, finely toothed, as in Black Poplar.",
      bark: "Grey, ridged, often with some bosses.",
      flower: "Male catkins (the usual clone is male).",
      fruit: "None, on the common male clone.",
      habitat: "Roadsides, shelterbelts, and field boundaries. A landmark tree of the English landscape since the eighteenth century.",
      notes: "Unmistakable in outline: a tall green exclamation mark. A fastigiate (upright-branched) form of Black Poplar, not a separate wild species, but too common to omit.",
      similar: ["black-poplar", "hybrid-black-poplar"]
    }),
    sp("black-poplar", "Black Poplar", "Populus nigra ssp. betulifolia", "Salicaceae", "Native", "to 30 m", {
      plate: "poplar-black",
      leaf: "Triangular to diamond-shaped, finely toothed, with a pair of glands at the junction of stalk and blade.",
      bark: "Deeply rugged, dark, with large bosses and burrs. Heavy branches arch downwards.",
      flower: "Bright red male catkins, or greenish female ones, in March.",
      fruit: "Cotton from female trees — now rare, as most survivors are male.",
      habitat: "Floodplains of the Midlands and Welsh borders; old meadows and riverbanks. A scarce native, much confused with hybrids.",
      notes: "A conservation tree. If the bole is bossed and the branches down-swept, and the site is an old flood-meadow, it may be the true native. When in doubt, compare with the common hybrid.",
      similar: ["hybrid-black-poplar", "lombardy-poplar"]
    }),
    sp("hybrid-black-poplar", "Hybrid Black Poplar", "Populus × canadensis", "Salicaceae", "Introduced, now wild", "to 35 m", {
      also: ["Populus × euramericana"],
      plate: "poplar-hybrid",
      leaf: "Triangular, often larger than native Black Poplar, with a more drawn-out tip.",
      bark: "Ridged, grey, without the great burrs of the native tree. Branches not so down-swept.",
      flower: "Catkins; many clones male.",
      fruit: "Cotton from female clones, in early summer — the ‘snow’ of river towns.",
      habitat: "Riversides, levels, plantations, and roadsides. The ordinary tall poplar of lowland England.",
      notes: "A hybrid of European and American black poplars, planted for timber and shelter. If it is a ‘black poplar’ and common, it is probably this.",
      similar: ["black-poplar", "lombardy-poplar"]
    }),
    sp("blackthorn", "Blackthorn", "Prunus spinosa", "Rosaceae", "Native", "to 4 m, occasionally a small tree", {
      also: ["Sloe"],
      plate: "blackthorn",
      leaf: "Small, oval, finely toothed, 2–4 cm, dull green.",
      bark: "Black-brown. Twigs ending in a stout thorn. Dense, suckering thickets.",
      flower: "Pure white, five-petalled, appearing in March–April on bare black twigs — before the leaves.",
      fruit: "The sloe: a blue-black drupe with a bloom, fiercely astringent until frosted.",
      habitat: "Hedges, scrub, and wood-edges throughout England.",
      notes: "Flowers on black wood before the leaf; then sloes. Hawthorn flowers later, with the leaves, and is not so dark in twig.",
      similar: ["hawthorn", "cherry-plum"]
    }),
    sp("cherry-plum", "Cherry Plum", "Prunus cerasifera", "Rosaceae", "Introduced, now wild", "to 8 m", {
      also: ["Myrobalan"],
      plate: "cherry-plum",
      leaf: "Oval, toothed, glossy, 4–7 cm, appearing with or just after the flowers.",
      bark: "Dark brown. Twigs green and glossy, sometimes a little spiny, not the dense black thorn-thicket of Blackthorn.",
      flower: "White, in February–March, among the first blossom of the year. Purple-leaved forms (Pissard’s plum) are garden trees sometimes escaped.",
      fruit: "A yellow, red, or purple cherry-plum, edible.",
      habitat: "Hedges, especially in the south and east; an old stock for grafting plums, now naturalised.",
      notes: "If ‘blackthorn’ is already in leaf when it flowers, and the twigs are green, it is Cherry Plum. A week or two earlier than true Blackthorn in most years.",
      similar: ["blackthorn", "wild-cherry"]
    }),
    sp("wild-cherry", "Wild Cherry", "Prunus avium", "Rosaceae", "Native", "to 25 m", {
      also: ["Gean", "Mazzard"],
      plate: "cherry",
      leaf: "Oblong, finely toothed, drawn out at the tip, limp and drooping. Two red glands on the stalk.",
      bark: "Red-brown, peeling in horizontal mahogany bands, with prominent lenticels. A beautiful bole.",
      flower: "White, in umbels of 2–6, with the young leaves, in April.",
      fruit: "Small dark red cherries, edible but often bitter.",
      habitat: "Woods and hedges throughout England, especially on the richer soils. Also the parent of sweet cherries.",
      notes: "The peeling banded bark and the glands on the stalk are the winter and summer keys. Autumn colour is a fine yellow and crimson.",
      similar: ["bird-cherry", "cherry-plum"]
    }),
    sp("bird-cherry", "Bird Cherry", "Prunus padus", "Rosaceae", "Native", "to 15 m", {
      plate: "bird-cherry",
      leaf: "Oval, finely toothed, with a drawn-out tip; two glands on the stalk, less obvious than in Wild Cherry.",
      bark: "Dark grey-brown, bitter-smelling, not peeling in mahogany bands.",
      flower: "White flowers in long hanging tassels (racemes) of 15–30, in May.",
      fruit: "Small, black, bitter cherries, taken by birds.",
      habitat: "Damp woods and riverbanks, mainly in the north and west of England; scarce in the south-east.",
      notes: "The hanging tassel of blossom is unlike any other native cherry. A northern tree, with a few planted outliers.",
      similar: ["wild-cherry"]
    }),
    sp("hazel", "Hazel", "Corylus avellana", "Betulaceae", "Native", "to 8 m, occasionally a small tree if not coppiced", {
      plate: "hazel",
      leaf: "Round to broadly oval, doubly toothed, with a short point, softly hairy. The leaf is almost as broad as long.",
      bark: "Smooth, coppery-brown, with horizontal lenticels. Old coppice stools become massive.",
      flower: "Lamb’s-tail male catkins in January–March; tiny red female flowers like crimson sea-anemones on the same twig.",
      fruit: "Nuts in a leafy, frilled husk, ripening in autumn.",
      habitat: "Woods, hedges, and coppice throughout England.",
      notes: "The catkins of late winter are known to everyone. A multi-stemmed shrub in coppice; a small tree if left. Nuts are taken by squirrels, mice, and jays.",
      similar: ["alder", "hornbeam"]
    }),
    sp("whitebeam", "Whitebeam", "Sorbus aria", "Rosaceae", "Native", "to 15 m", {
      plate: "whitebeam",
      leaf: "Oval, irregularly toothed (not deeply lobed), dark green above, brilliantly white-felted beneath. The tree flashes white in the wind.",
      bark: "Grey, smooth.",
      flower: "White heads in May.",
      fruit: "Orange-red, speckled, mealy berries.",
      habitat: "Woods and crags on chalk and limestone, mainly in the south. Also planted.",
      notes: "Several rare whitebeams have been split off as species in their own right; this is the common one of the downs. Swedish Whitebeam is shallower-lobed and a tree of towns.",
      similar: ["swedish-whitebeam", "wayfaring-tree"]
    }),
    sp("goat-willow", "Goat Willow", "Salix caprea", "Salicaceae", "Native", "to 10 m", {
      also: ["Pussy Willow", "Great Sallow"],
      plate: "willow-goat",
      leaf: "Broad-oval, almost as wide as long, with a slightly twisted point, grey-woolly beneath, not silky-silvery.",
      bark: "Grey, fissured on old stems.",
      flower: "The familiar silver-then-yellow ‘pussy willow’ catkins, before the leaves, in March.",
      fruit: "Cotton-wool seed from female bushes.",
      habitat: "Woods, hedges, waste ground, and damp places throughout England. Not confined to riversides.",
      notes: "The broadest-leaved common willow. If it looks like a sallow with pussy-willow catkins and wide leaves, it is this.",
      similar: ["grey-willow"]
    }),
    sp("grey-willow", "Grey Willow", "Salix cinerea", "Salicaceae", "Native", "to 10 m", {
      also: ["Grey Sallow", "Common Sallow"],
      plate: "willow-grey",
      leaf: "Oblong, wrinkled, dull grey-green, downy beneath, 2–3 times as long as wide (narrower than Goat Willow).",
      bark: "Grey. Young twigs often ridged under the bark if you peel it (ssp. oleifolia, the common English plant).",
      flower: "Catkins, similar to Goat Willow but usually a little later and less showy.",
      fruit: "Cotton-wool seed.",
      habitat: "Wet ground, marshes, pond-sides, and damp woods. Commoner in truly wet places than Goat Willow.",
      notes: "Willows hybridise freely, and sallows are a known difficulty. Prefer Grey Willow if the site is marshy and the leaf is oblong and wrinkled.",
      similar: ["goat-willow"]
    }),
    sp("crab-apple", "Crab Apple", "Malus sylvestris", "Rosaceae", "Native", "to 10 m", {
      plate: "apple",
      leaf: "Oval, finely toothed, hairless when mature, 3–7 cm.",
      bark: "Grey-brown, becoming scaly. Twigs sometimes a little spiny; downy twigs suggest a feral domestic apple instead.",
      flower: "White or pink-flushed, in May.",
      fruit: "A small, hard, yellow-green apple, often speckled, very sour.",
      habitat: "Woods and hedges. True wild crab is less common than escaped orchard apples, which may look similar.",
      notes: "Hairless leaves and a sour, yellowish crab suggest the wild tree. If the twigs are densely downy and the fruit is larger, it is probably a feral apple (M. domestica).",
      similar: ["wild-pear", "hawthorn"]
    }),
    sp("wild-pear", "Wild Pear", "Pyrus pyraster", "Rosaceae", "Native / long-established", "to 15 m", {
      plate: "pear",
      leaf: "Oval, finely toothed, glossy, rather leathery, with a long stalk.",
      bark: "Dark grey, breaking into small square plates. Twigs often spiny.",
      flower: "Pure white, in April, a little before apple.",
      fruit: "A small pear, tapering to the stalk, hard and gritty, brownish or yellowish.",
      habitat: "Hedges and wood-edges, scarce. Many ‘wild’ pears are old rootstocks or escapes of cultivated pear (P. communis).",
      notes: "Glossy leaves, square-plated bark, and a fruit that tapers to the stalk. Apple fruit is squat, with the remains of the calyx in a hollow at the end.",
      similar: ["crab-apple"]
    }),
    sp("alder-buckthorn", "Alder Buckthorn", "Frangula alnus", "Rhamnaceae", "Native", "to 5 m", {
      plate: "buckthorn-alder",
      leaf: "Alternate, oval, entire or nearly so, with 6–10 pairs of parallel side veins. Buds naked (no scales), hairy.",
      bark: "Grey, with vertical pale lenticels. No thorns.",
      flower: "Tiny, greenish-white, five-petalled, in the leaf axils.",
      fruit: "Berries red then black, like tiny cherries.",
      habitat: "Damp acid woods, bogs, and heath-edges. A shrub of wet, peaty ground.",
      notes: "Not an alder, and not thorny. The many parallel veins and the naked buds distinguish it from Purging Buckthorn, which is toothed and often thorny.",
      similar: ["purging-buckthorn", "alder"]
    }),
    sp("purging-buckthorn", "Purging Buckthorn", "Rhamnus cathartica", "Rhamnaceae", "Native", "to 6 m", {
      plate: "buckthorn-purging",
      leaf: "Oval, toothed, with only 2–4 pairs of veins. Some twigs end in a thorn. Leaves often almost opposite on strong shoots.",
      bark: "Grey-brown, orange if you scratch it.",
      flower: "Tiny, yellowish, four-petalled, dioecious.",
      fruit: "Black berries, violently purgative — not to be eaten.",
      habitat: "Hedges and scrub on chalk and limestone.",
      notes: "A shrub of the chalk. The thorn-tipped twigs and toothed leaves separate it from Alder Buckthorn. A food-plant of the brimstone butterfly.",
      similar: ["alder-buckthorn", "blackthorn"]
    })
  ];
})(typeof window !== "undefined" ? window : globalThis);
