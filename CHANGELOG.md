# 1.3.0 (2024-07-05)


### Bug Fixes

* **api:** change GET to POST ([d5275fa](https://github.com/CMD-Forum/cmd-forum/commit/d5275faa290e1769277551a59ce41ff1399e82f1))
* **api:** fixes unreachable code error ([c4666c3](https://github.com/CMD-Forum/cmd-forum/commit/c4666c3bcc8065d9a6e8727b4245660b57a18759))
* **auth:** fix github auth (maybe) ([7e0dd09](https://github.com/CMD-Forum/cmd-forum/commit/7e0dd09af8e6a35bc1213031e7152292bd344f61))
* **auth:** fixes github callback ([d409761](https://github.com/CMD-Forum/cmd-forum/commit/d409761c87b70ba25ce67f89bbe23454931551be))
* **auth:** fixes signup ([281d784](https://github.com/CMD-Forum/cmd-forum/commit/281d784e4d4a9afeb505626e416516b9b869d86e))
* **db:** temporarily fixes `globalThis` error ([ad395f4](https://github.com/CMD-Forum/cmd-forum/commit/ad395f42c81effa6d85d57080a679ccd2f313c12))
* **deps:** changes `bcrypt` dependency to `bcryptjs` ([7ee9e20](https://github.com/CMD-Forum/cmd-forum/commit/7ee9e20e705dabaaa25b8ccaae692cd86496b57b))
* **deps:** fixes dependency issues ([59cc242](https://github.com/CMD-Forum/cmd-forum/commit/59cc2424130ef2cb5be80d35475a5930d3b359ac))
* **deps:** fixes prisma being undefined in the moderation page, closes [#23](https://github.com/CMD-Forum/cmd-forum/issues/23) ([d4e79a8](https://github.com/CMD-Forum/cmd-forum/commit/d4e79a892adbd2dd2fa4a53cced657ca6ed5a940))
* disable homepage ([faf511f](https://github.com/CMD-Forum/cmd-forum/commit/faf511f70a7f4d221eedb6cccfc1bd6d8ee1aa78))
* **docker:** fix docker not seeding database ([6b8693b](https://github.com/CMD-Forum/cmd-forum/commit/6b8693b412c729d5243f29663af005083ef47481))
* **docker:** fix prisma being unavailable in docker ([32a289c](https://github.com/CMD-Forum/cmd-forum/commit/32a289c1178af33cb04f1d850129b60ef8fc5008))
* **docker:** fix startup ([78c9e09](https://github.com/CMD-Forum/cmd-forum/commit/78c9e0953ee389a4cdfff3600f3017ec4ce076a6))
* **docker:** run prisma on start ([67bb6b1](https://github.com/CMD-Forum/cmd-forum/commit/67bb6b1a8662030a3269d4794ae1c429893bce4e))
* **eslint:** fix remaining eslint warnings ([b214c60](https://github.com/CMD-Forum/cmd-forum/commit/b214c60c87a49c13b814af1ec83bd26717c0c778))
* fix absence of titles in settings ([0c43e19](https://github.com/CMD-Forum/cmd-forum/commit/0c43e1981f2f202d6528baee5f4c2013980ead46))
* fix bttomdrawer reference ([86a6d8f](https://github.com/CMD-Forum/cmd-forum/commit/86a6d8fb6c3fd428a5f663fe54e78979fe3448a9))
* fixes design page ([6bb4fb9](https://github.com/CMD-Forum/cmd-forum/commit/6bb4fb98a52d464edcd2c5de6f1f9c2489ccbcc4))
* fixes small bugs ([6c74bc4](https://github.com/CMD-Forum/cmd-forum/commit/6c74bc494476c4852a62946354f490c2fef7b6e8))
* **layout, aria:** removes unused modal root div ([24c84b3](https://github.com/CMD-Forum/cmd-forum/commit/24c84b3cc3e0e13e161d780e33ca2f73b12532a9))
* migration ([2f540cf](https://github.com/CMD-Forum/cmd-forum/commit/2f540cf62dc99037c7c63cd6bee4201d3959f515))
* **posts:** fixes more tagline issues ([c282228](https://github.com/CMD-Forum/cmd-forum/commit/c2822287bf64ad78a48fc9baa4864b0eb7512571))
* **posts:** fixes post tagline issue ([de65eec](https://github.com/CMD-Forum/cmd-forum/commit/de65eec5d26a46f0dfc4b12a58f1adc5a90c173a))
* **search:** fix community description being excluded from results ([9c8c122](https://github.com/CMD-Forum/cmd-forum/commit/9c8c1222b07238135d024cafa943374392a1eb57))
* **typescript:** fixes issues with images and `PostAuthor` type. ([d5db786](https://github.com/CMD-Forum/cmd-forum/commit/d5db7868589969857f0539bf36a00741e719c798))
* **typescript:** makes `ProfileMain` accept null for image ([545b299](https://github.com/CMD-Forum/cmd-forum/commit/545b29924ebca64d03c6858e7f38c14f6212ccd7))
* **typescript:** replaces `<img>` tag with `<ProfileImage />` to fix ts error. ([174fa7d](https://github.com/CMD-Forum/cmd-forum/commit/174fa7d161267b064dcafb5f90ee18e775a94410))
* **typescript:** stops typescript complaining about author type ([0cf8454](https://github.com/CMD-Forum/cmd-forum/commit/0cf8454b9440997932eef8d8a98033ced40e9fb1))
* **ui,posts:** fixes [#16](https://github.com/CMD-Forum/cmd-forum/issues/16) ([d81689f](https://github.com/CMD-Forum/cmd-forum/commit/d81689fe2373587503272a02873665a02e66bf3f))
* **ui:** actually fix [#30](https://github.com/CMD-Forum/cmd-forum/issues/30) ([a09bfce](https://github.com/CMD-Forum/cmd-forum/commit/a09bfcea47cc1c0ef2ddc68f4b470e45baed09fb))
* **ui:** adds `hide-scrollbar` class and fixes [#19](https://github.com/CMD-Forum/cmd-forum/issues/19) ([1dc23e2](https://github.com/CMD-Forum/cmd-forum/commit/1dc23e2f48244aa37d0803a5ac7974bbb556dcd3))
* **ui:** dropdowns use prop component ([7d5eb04](https://github.com/CMD-Forum/cmd-forum/commit/7d5eb0407a37b3064b305a45dbffa3341b6e08d8))
* **ui:** fix [#30](https://github.com/CMD-Forum/cmd-forum/issues/30) ([47b5dc3](https://github.com/CMD-Forum/cmd-forum/commit/47b5dc37b49c79f7ae554c778cb8dacccdafc399))
* **ui:** fix alert alignment ([a150924](https://github.com/CMD-Forum/cmd-forum/commit/a1509241d35c9d89301a42ed5b77ab9cb29924d9))
* **ui:** fix community info not appearing when logged out ([3b3d046](https://github.com/CMD-Forum/cmd-forum/commit/3b3d046b424d41731e6d86c92006c34e7b38b198))
* **ui:** fixes broken dropdowns in `navigation.tsx` ([61c4cbe](https://github.com/CMD-Forum/cmd-forum/commit/61c4cbe2fae6ee42f67d623fc045258583bee591))
* **ui:** fixes broken error messages on forms ([#21](https://github.com/CMD-Forum/cmd-forum/issues/21)) ([b512351](https://github.com/CMD-Forum/cmd-forum/commit/b5123513776dd6cc561216a2c49b3602f7432bc3))
* **ui:** fixes broken labels and other bugs in settings ([1521a86](https://github.com/CMD-Forum/cmd-forum/commit/1521a867bc5ea3581f8ef2fcfdeba4a7fb9141f9))
* **ui:** fixes dropdown in `sidebar.tsx` ([6b27b40](https://github.com/CMD-Forum/cmd-forum/commit/6b27b40d6aa4d127eb40068b746c20f0efa35c27))
* **ui:** fixes dropdown on card posts appearing when no session is active ([a254b60](https://github.com/CMD-Forum/cmd-forum/commit/a254b60d3582613c385c5c6a9ddc3e8952ae9407))
* **ui:** fixes dropdowns in UI development page ([60b3b22](https://github.com/CMD-Forum/cmd-forum/commit/60b3b22bd1d76908f5034841648e0dc7c77394a8))
* **ui:** fixes export error on account and design page ([851394c](https://github.com/CMD-Forum/cmd-forum/commit/851394c9229b207bdbb64ffc7c31e02d47557d9d))
* **ui:** fixes footer text size ([20a2425](https://github.com/CMD-Forum/cmd-forum/commit/20a2425478795d56a9b57fa830500113b4ccb0e4))
* **ui:** fixes incorrect text spacing on login page ([6c4dfda](https://github.com/CMD-Forum/cmd-forum/commit/6c4dfda26fdfb7bd050eab41e5ea084cfc63e5d6))
* **ui:** fixes theme test page dropdown ([83b3d12](https://github.com/CMD-Forum/cmd-forum/commit/83b3d12aeb633fbec0374d6e5b5aeb7c108484b3))


### Features

* **accessibility:** accessibility improvements ([2b19e5a](https://github.com/CMD-Forum/cmd-forum/commit/2b19e5ae9488b9ddabbab7977abdf7aba32ceb41))
* **accessibility:** add aria-labels ([3df79b4](https://github.com/CMD-Forum/cmd-forum/commit/3df79b4cf0c7a91c72476bab75589b36d0d3e86a))
* add controlled dialog & delete dialog for posts ([b22feb4](https://github.com/CMD-Forum/cmd-forum/commit/b22feb43b0bfd4fc92fe9ebe7dadccea93d8cc20))
* add vercel feature flags ([28f28f7](https://github.com/CMD-Forum/cmd-forum/commit/28f28f78548ae62fb99395d92cbfdda39e8cea82))
* **aria:** adds aria labels and roles to sidebar ([a26d9ee](https://github.com/CMD-Forum/cmd-forum/commit/a26d9eedcd8b381e1e87d58c337511b39c143223))
* **auth:** migrates to lucia-auth and replaces authjs ([bc5d812](https://github.com/CMD-Forum/cmd-forum/commit/bc5d812a4fb9e04c80c567291273d1dcf776d7c7))
* **communities:** adds community rules ([0cd0c43](https://github.com/CMD-Forum/cmd-forum/commit/0cd0c43b0ec8a08e5027f5f7fd53b5d738d8ab5f))
* **deps:** add conventional-changelog ([f3a58d6](https://github.com/CMD-Forum/cmd-forum/commit/f3a58d65149a46e19f99ec19d7a895fe53d18d48))
* join and leave communities ([4360c10](https://github.com/CMD-Forum/cmd-forum/commit/4360c108d47df61a9e70381d8426f0a041c5e29c))
* **metadata:** updates metadata ([02a545a](https://github.com/CMD-Forum/cmd-forum/commit/02a545ae7d6069ee403a7d381dc7ed20f861ade8))
* more auth features, e.g session control, and css changes. ([91dcfce](https://github.com/CMD-Forum/cmd-forum/commit/91dcfcebc1bb5f279241cd579e609ed5e519362b))
* **ui:** add loading skeletons ([1d77d63](https://github.com/CMD-Forum/cmd-forum/commit/1d77d63e59289c3b551b1f8ab1ff3ae9053dd847))
* **ui:** add show password button to login & signup ([98fc15e](https://github.com/CMD-Forum/cmd-forum/commit/98fc15ec9c19b51bf0f52aa0fe375019c0331b40))
* **ui:** add unimplemented page for respective features ([25ec4fc](https://github.com/CMD-Forum/cmd-forum/commit/25ec4fc32cb0a15ecc523d34328eb115cc1a73f5))
* **ui:** added confirmation dialog before destroying sessions + layout tweaks ([9214855](https://github.com/CMD-Forum/cmd-forum/commit/921485581c4f46bc42ad16615f45ba33778d7bbc))
* **ui:** adds new page for theme testing ([5a13239](https://github.com/CMD-Forum/cmd-forum/commit/5a13239bf9c02d28230dc56def97829aa19fe91a))
* **ui:** adds titles to pages ([0977a0d](https://github.com/CMD-Forum/cmd-forum/commit/0977a0d15d098ed43f56fcb44f05394c5e6d762f))
* **ui:** change `rounded-md` to `rounded` ([852015e](https://github.com/CMD-Forum/cmd-forum/commit/852015ed680c19229fbdce170fb0bc78a214a738))
* **ui:** change post to use link instead of hovercard ([480c191](https://github.com/CMD-Forum/cmd-forum/commit/480c19170d18674d7f0b70d0ed38606057715bfb))
* **ui:** changes to login and signup pages ([8b87101](https://github.com/CMD-Forum/cmd-forum/commit/8b87101ffd0a74229dad1e5c9160800bf369df47))
* **ui:** css changes ([eae3f64](https://github.com/CMD-Forum/cmd-forum/commit/eae3f6437c4b9e24e227a7ba06d8f220d9105ca5))
* **ui:** css, dialog changes, fixes ([b1a78cc](https://github.com/CMD-Forum/cmd-forum/commit/b1a78cc6d69606a56e4c387c936067fba25c25d0))
* **ui:** dropdown overhauled ([1e91c71](https://github.com/CMD-Forum/cmd-forum/commit/1e91c71d6d2bdc7d34420a7112025006d5a9f778))
* **ui:** new `ProfileImage` component ([1f62a9e](https://github.com/CMD-Forum/cmd-forum/commit/1f62a9e9dff637406a7c1574d10c095c36c2ba35))
* **ui:** overhaul `Hovercard` ([f9c7e9a](https://github.com/CMD-Forum/cmd-forum/commit/f9c7e9a2296526af5407abf8ab3645c53785a15d))
* **ui:** overhaul footer ([ee31984](https://github.com/CMD-Forum/cmd-forum/commit/ee319847a2bf70bfc4a35ca22ef400bf5a5fa593))
* **ui:** overhauls login and signup pages to look better ([8b073b1](https://github.com/CMD-Forum/cmd-forum/commit/8b073b190032614b9a1e131d06072902b4761ea6))
* **ui:** pagination now displays page ([6355e91](https://github.com/CMD-Forum/cmd-forum/commit/6355e91694565b520bc9112472fb2c89baeb16bd))
* **ui:** redesigns alerts ([cd9b90c](https://github.com/CMD-Forum/cmd-forum/commit/cd9b90cace112dbad22cc15eef499195f9fee0b9))
* **ui:** remove join button when logged out ([9753acf](https://github.com/CMD-Forum/cmd-forum/commit/9753acf86ba6c09d5876258429f2ff90f42cc987))
* **ui:** remove landing page ([876cd1c](https://github.com/CMD-Forum/cmd-forum/commit/876cd1c9b06de493d5185a97592a024900ce6d2f))
* **ui:** replace mobile account options with dropdown ([d5e715b](https://github.com/CMD-Forum/cmd-forum/commit/d5e715b493689cefdd442b5102966beaff8b75e4))
* **ui:** replaces profile image initials with icon image ([9d69408](https://github.com/CMD-Forum/cmd-forum/commit/9d694084924b668a75cc502c5e0b2cd6b03a9ad7))
* **ui:** rewrite menu component ([b625ace](https://github.com/CMD-Forum/cmd-forum/commit/b625aceca7b6652e1cfd082649e2e6c16f66a928))
* **ui:** rewrite of dialog code ([f6db55a](https://github.com/CMD-Forum/cmd-forum/commit/f6db55a471ead17ceb3d1781022486a6037660f6))
* updates metadata further ([383dc06](https://github.com/CMD-Forum/cmd-forum/commit/383dc065f33a5cfa1c798e2c9fb0d11cf7916bdd))


### Performance Improvements

* improves post perfomance ([61921ee](https://github.com/CMD-Forum/cmd-forum/commit/61921ee2b72a4585f6d53b29951dea57725c0c5a))
* make join community and community member count seperate components ([c5f86b6](https://github.com/CMD-Forum/cmd-forum/commit/c5f86b63bf9400366edef7f3bc22c2ccfd10206b))
* preload images to improve performance ([fa8865f](https://github.com/CMD-Forum/cmd-forum/commit/fa8865f041aaf289cf084586865d62e5a13847f4))


### Reverts

* **changelog:** removes changelog.md ([dde3577](https://github.com/CMD-Forum/cmd-forum/commit/dde357795865a62aa2c733abd2515574d7f3fefc))
* **deps:** remove `eslint-plugin-unused-imports@3.2.0` ([a7280eb](https://github.com/CMD-Forum/cmd-forum/commit/a7280eb5b2feef9f684fd9289f7a94dd44f81390))
* readd profile image svg ([581b15e](https://github.com/CMD-Forum/cmd-forum/commit/581b15eef8603036ddfbcc32cfb028b0281c77e8))



# 1.2.0 (2024-06-06)


### Bug Fixes

* **api:** fixes unreachable code error ([c4666c3](https://github.com/CMD-Forum/cmd-forum/commit/c4666c3bcc8065d9a6e8727b4245660b57a18759))
* **db:** temporarily fixes `globalThis` error ([ad395f4](https://github.com/CMD-Forum/cmd-forum/commit/ad395f42c81effa6d85d57080a679ccd2f313c12))
* **deps:** changes `bcrypt` dependency to `bcryptjs` ([7ee9e20](https://github.com/CMD-Forum/cmd-forum/commit/7ee9e20e705dabaaa25b8ccaae692cd86496b57b))
* **deps:** fixes dependency issues ([59cc242](https://github.com/CMD-Forum/cmd-forum/commit/59cc2424130ef2cb5be80d35475a5930d3b359ac))
* **deps:** fixes prisma being undefined in the moderation page, closes [#23](https://github.com/CMD-Forum/cmd-forum/issues/23) ([d4e79a8](https://github.com/CMD-Forum/cmd-forum/commit/d4e79a892adbd2dd2fa4a53cced657ca6ed5a940))
* **eslint:** fix remaining eslint warnings ([b214c60](https://github.com/CMD-Forum/cmd-forum/commit/b214c60c87a49c13b814af1ec83bd26717c0c778))
* fix absence of titles in settings ([0c43e19](https://github.com/CMD-Forum/cmd-forum/commit/0c43e1981f2f202d6528baee5f4c2013980ead46))
* **layout, aria:** removes unused modal root div ([24c84b3](https://github.com/CMD-Forum/cmd-forum/commit/24c84b3cc3e0e13e161d780e33ca2f73b12532a9))
* migration ([2f540cf](https://github.com/CMD-Forum/cmd-forum/commit/2f540cf62dc99037c7c63cd6bee4201d3959f515))
* **posts:** fixes more tagline issues ([c282228](https://github.com/CMD-Forum/cmd-forum/commit/c2822287bf64ad78a48fc9baa4864b0eb7512571))
* **posts:** fixes post tagline issue ([de65eec](https://github.com/CMD-Forum/cmd-forum/commit/de65eec5d26a46f0dfc4b12a58f1adc5a90c173a))
* **search:** fix community description being excluded from results ([9c8c122](https://github.com/CMD-Forum/cmd-forum/commit/9c8c1222b07238135d024cafa943374392a1eb57))
* **typescript:** fixes issues with images and `PostAuthor` type. ([d5db786](https://github.com/CMD-Forum/cmd-forum/commit/d5db7868589969857f0539bf36a00741e719c798))
* **typescript:** makes `ProfileMain` accept null for image ([545b299](https://github.com/CMD-Forum/cmd-forum/commit/545b29924ebca64d03c6858e7f38c14f6212ccd7))
* **typescript:** replaces `<img>` tag with `<ProfileImage />` to fix ts error. ([174fa7d](https://github.com/CMD-Forum/cmd-forum/commit/174fa7d161267b064dcafb5f90ee18e775a94410))
* **typescript:** stops typescript complaining about author type ([0cf8454](https://github.com/CMD-Forum/cmd-forum/commit/0cf8454b9440997932eef8d8a98033ced40e9fb1))
* **ui,posts:** fixes [#16](https://github.com/CMD-Forum/cmd-forum/issues/16) ([d81689f](https://github.com/CMD-Forum/cmd-forum/commit/d81689fe2373587503272a02873665a02e66bf3f))
* **ui:** adds `hide-scrollbar` class and fixes [#19](https://github.com/CMD-Forum/cmd-forum/issues/19) ([1dc23e2](https://github.com/CMD-Forum/cmd-forum/commit/1dc23e2f48244aa37d0803a5ac7974bbb556dcd3))
* **ui:** dropdowns use prop component ([7d5eb04](https://github.com/CMD-Forum/cmd-forum/commit/7d5eb0407a37b3064b305a45dbffa3341b6e08d8))
* **ui:** fix alert alignment ([a150924](https://github.com/CMD-Forum/cmd-forum/commit/a1509241d35c9d89301a42ed5b77ab9cb29924d9))
* **ui:** fix community info not appearing when logged out ([3b3d046](https://github.com/CMD-Forum/cmd-forum/commit/3b3d046b424d41731e6d86c92006c34e7b38b198))
* **ui:** fixes broken dropdowns in `navigation.tsx` ([61c4cbe](https://github.com/CMD-Forum/cmd-forum/commit/61c4cbe2fae6ee42f67d623fc045258583bee591))
* **ui:** fixes broken error messages on forms ([#21](https://github.com/CMD-Forum/cmd-forum/issues/21)) ([b512351](https://github.com/CMD-Forum/cmd-forum/commit/b5123513776dd6cc561216a2c49b3602f7432bc3))
* **ui:** fixes broken labels and other bugs in settings ([1521a86](https://github.com/CMD-Forum/cmd-forum/commit/1521a867bc5ea3581f8ef2fcfdeba4a7fb9141f9))
* **ui:** fixes dropdown in `sidebar.tsx` ([6b27b40](https://github.com/CMD-Forum/cmd-forum/commit/6b27b40d6aa4d127eb40068b746c20f0efa35c27))
* **ui:** fixes dropdown on card posts appearing when no session is active ([a254b60](https://github.com/CMD-Forum/cmd-forum/commit/a254b60d3582613c385c5c6a9ddc3e8952ae9407))
* **ui:** fixes dropdowns in UI development page ([60b3b22](https://github.com/CMD-Forum/cmd-forum/commit/60b3b22bd1d76908f5034841648e0dc7c77394a8))
* **ui:** fixes export error on account and design page ([851394c](https://github.com/CMD-Forum/cmd-forum/commit/851394c9229b207bdbb64ffc7c31e02d47557d9d))
* **ui:** fixes incorrect text spacing on login page ([6c4dfda](https://github.com/CMD-Forum/cmd-forum/commit/6c4dfda26fdfb7bd050eab41e5ea084cfc63e5d6))
* **ui:** fixes theme test page dropdown ([83b3d12](https://github.com/CMD-Forum/cmd-forum/commit/83b3d12aeb633fbec0374d6e5b5aeb7c108484b3))


### Features

* **accessibility:** add aria-labels ([3df79b4](https://github.com/CMD-Forum/cmd-forum/commit/3df79b4cf0c7a91c72476bab75589b36d0d3e86a))
* **aria:** adds aria labels and roles to sidebar ([a26d9ee](https://github.com/CMD-Forum/cmd-forum/commit/a26d9eedcd8b381e1e87d58c337511b39c143223))
* **communities:** adds community rules ([0cd0c43](https://github.com/CMD-Forum/cmd-forum/commit/0cd0c43b0ec8a08e5027f5f7fd53b5d738d8ab5f))
* **deps:** add conventional-changelog ([f3a58d6](https://github.com/CMD-Forum/cmd-forum/commit/f3a58d65149a46e19f99ec19d7a895fe53d18d48))
* join and leave communities ([4360c10](https://github.com/CMD-Forum/cmd-forum/commit/4360c108d47df61a9e70381d8426f0a041c5e29c))
* **ui:** add loading skeletons ([1d77d63](https://github.com/CMD-Forum/cmd-forum/commit/1d77d63e59289c3b551b1f8ab1ff3ae9053dd847))
* **ui:** add show password button to login & signup ([98fc15e](https://github.com/CMD-Forum/cmd-forum/commit/98fc15ec9c19b51bf0f52aa0fe375019c0331b40))
* **ui:** add unimplemented page for respective features ([25ec4fc](https://github.com/CMD-Forum/cmd-forum/commit/25ec4fc32cb0a15ecc523d34328eb115cc1a73f5))
* **ui:** adds new page for theme testing ([5a13239](https://github.com/CMD-Forum/cmd-forum/commit/5a13239bf9c02d28230dc56def97829aa19fe91a))
* **ui:** adds titles to pages ([0977a0d](https://github.com/CMD-Forum/cmd-forum/commit/0977a0d15d098ed43f56fcb44f05394c5e6d762f))
* **ui:** dropdown overhauled ([1e91c71](https://github.com/CMD-Forum/cmd-forum/commit/1e91c71d6d2bdc7d34420a7112025006d5a9f778))
* **ui:** new `ProfileImage` component ([1f62a9e](https://github.com/CMD-Forum/cmd-forum/commit/1f62a9e9dff637406a7c1574d10c095c36c2ba35))
* **ui:** overhaul `Hovercard` ([f9c7e9a](https://github.com/CMD-Forum/cmd-forum/commit/f9c7e9a2296526af5407abf8ab3645c53785a15d))
* **ui:** overhaul footer ([ee31984](https://github.com/CMD-Forum/cmd-forum/commit/ee319847a2bf70bfc4a35ca22ef400bf5a5fa593))
* **ui:** overhauls login and signup pages to look better ([8b073b1](https://github.com/CMD-Forum/cmd-forum/commit/8b073b190032614b9a1e131d06072902b4761ea6))
* **ui:** redesigns alerts ([cd9b90c](https://github.com/CMD-Forum/cmd-forum/commit/cd9b90cace112dbad22cc15eef499195f9fee0b9))
* **ui:** remove join button when logged out ([9753acf](https://github.com/CMD-Forum/cmd-forum/commit/9753acf86ba6c09d5876258429f2ff90f42cc987))
* **ui:** remove landing page ([876cd1c](https://github.com/CMD-Forum/cmd-forum/commit/876cd1c9b06de493d5185a97592a024900ce6d2f))
* **ui:** replace mobile account options with dropdown ([d5e715b](https://github.com/CMD-Forum/cmd-forum/commit/d5e715b493689cefdd442b5102966beaff8b75e4))
* **ui:** replaces profile image initials with icon image ([9d69408](https://github.com/CMD-Forum/cmd-forum/commit/9d694084924b668a75cc502c5e0b2cd6b03a9ad7))


### Performance Improvements

* preload images to improve performance ([fa8865f](https://github.com/CMD-Forum/cmd-forum/commit/fa8865f041aaf289cf084586865d62e5a13847f4))


### Reverts

* **changelog:** removes changelog.md ([dde3577](https://github.com/CMD-Forum/cmd-forum/commit/dde357795865a62aa2c733abd2515574d7f3fefc))
* **deps:** remove `eslint-plugin-unused-imports@3.2.0` ([a7280eb](https://github.com/CMD-Forum/cmd-forum/commit/a7280eb5b2feef9f684fd9289f7a94dd44f81390))
* readd profile image svg ([581b15e](https://github.com/CMD-Forum/cmd-forum/commit/581b15eef8603036ddfbcc32cfb028b0281c77e8))



