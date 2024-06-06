# 1.2.0 (2024-06-06)


### Bug Fixes

* **api:** fixes unreachable code error ([c4666c3](https://github.com/CMD-Forum/cmd-forum/commit/c4666c3bcc8065d9a6e8727b4245660b57a18759))
* **db:** temporarily fixes `globalThis` error ([ad395f4](https://github.com/CMD-Forum/cmd-forum/commit/ad395f42c81effa6d85d57080a679ccd2f313c12))
* **deps:** changes `bcrypt` dependency to `bcryptjs` ([7ee9e20](https://github.com/CMD-Forum/cmd-forum/commit/7ee9e20e705dabaaa25b8ccaae692cd86496b57b))
* **deps:** fixes dependency issues ([59cc242](https://github.com/CMD-Forum/cmd-forum/commit/59cc2424130ef2cb5be80d35475a5930d3b359ac))
* **deps:** fixes prisma being undefined in the moderation page, closes [#23](https://github.com/CMD-Forum/cmd-forum/issues/23) ([d4e79a8](https://github.com/CMD-Forum/cmd-forum/commit/d4e79a892adbd2dd2fa4a53cced657ca6ed5a940))
* **eslint:** fix remaining eslint warnings ([b214c60](https://github.com/CMD-Forum/cmd-forum/commit/b214c60c87a49c13b814af1ec83bd26717c0c778))
* **layout, aria:** removes unused modal root div ([24c84b3](https://github.com/CMD-Forum/cmd-forum/commit/24c84b3cc3e0e13e161d780e33ca2f73b12532a9))
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
* **ui:** remove landing page ([876cd1c](https://github.com/CMD-Forum/cmd-forum/commit/876cd1c9b06de493d5185a97592a024900ce6d2f))
* **ui:** replace mobile account options with dropdown ([d5e715b](https://github.com/CMD-Forum/cmd-forum/commit/d5e715b493689cefdd442b5102966beaff8b75e4))
* **ui:** replaces profile image initials with icon image ([9d69408](https://github.com/CMD-Forum/cmd-forum/commit/9d694084924b668a75cc502c5e0b2cd6b03a9ad7))


### Performance Improvements

* preload images to improve performance ([fa8865f](https://github.com/CMD-Forum/cmd-forum/commit/fa8865f041aaf289cf084586865d62e5a13847f4))


### Reverts

* **changelog:** removes changelog.md ([dde3577](https://github.com/CMD-Forum/cmd-forum/commit/dde357795865a62aa2c733abd2515574d7f3fefc))
* **deps:** remove `eslint-plugin-unused-imports@3.2.0` ([a7280eb](https://github.com/CMD-Forum/cmd-forum/commit/a7280eb5b2feef9f684fd9289f7a94dd44f81390))
* readd profile image svg ([581b15e](https://github.com/CMD-Forum/cmd-forum/commit/581b15eef8603036ddfbcc32cfb028b0281c77e8))



