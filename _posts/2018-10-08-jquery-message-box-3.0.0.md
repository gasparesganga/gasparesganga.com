---
layout      : post
title       : jQuery MessageBox 3.0.0
description : New features, fixes and more goodness
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---


It's time for MessageBox 3. There are some minor breaking changes, but it comes packed with new features and fixes. Hey, it's already 3, it can walk by itself!


### What's new in version 3.0.0
- New `customOverlayClass` option
- New `title` option
- New input type `"checkbox"`
- New input type `"caption"`
- New inputs `customClass` option
- New inputs `message` option
- Javascript sourcemaps
- Minified default CSS file
- Inputs `default` option renamed to `defaultValue`
- Buttons `class` option renamed to `customClass`
- Simplified default CSS which is more easily customizable
- New folder structure
- Content horizontal padding is preserved also in case of horizontal overflow
- Minor CSS and code quirks


#### New `customOverlayClass` option
Now you can customize each MessageBox overlay if you like to. The official [documentation page](/labs/jquery-message-box/) has some examples.

#### New `title` option
This was a request and it actually makes sense to have a title on top of the MessageBox sometimes.

#### New input type `"checkbox"`
Another request. I have always used a `select` with two options *(eg. `yes` and `no`) but a checkbox may come in handy to people who prefer it.

#### New input type `"caption"`
What if you wanted to write some spare text or place random *HTML* inbetween inputs? Here is the solution.

#### New inputs `customClass` option
Now you can customize single inputs the same way you could with buttons.

#### New inputs `message` option
This is used in conjunction with new input type `"caption"` to show the actual message.

#### Javascript sourcemaps
It was about time.

#### Minified default CSS file
See above. 

#### Inputs `default` option renamed to `defaultValue`
I know, IE8 is far and gone, but still having a reserved word highlighted by some editors was bothering me. This new name is more self-explanatory too.

#### Buttons `class` option renamed to `customClass`
Same as previous point.

#### Simplified default CSS which is more easily customizable
This plugin comes with some clean and simple default CSS. Of course you are encouraged to customize it and a clearer default CSS file will help you doing that.

#### New folder structure
Source files are now under `src/` and production files under `dist/`.

#### Content horizontal padding is preserved also in case of horizontal overflow
This was driving me crazy. With overflowing contents it seemed impossible to set some proper paddings without additional markup. Fixed!

#### Minor CSS and code quirks
A bunch of other things have been changed to make the plugin more robust and reliable.


### Breaking changes amd important notes on upgrading from v2
Yeah, all of this does not sound like a huge departure from v2, but since a few breaking changes were included both in JS and CSS files, it is a good idea to increase the major release.
Renaming `class` and `default` options to `customClass` and `defaultValue` may break some existing code, as well as the new folder structure and in rare cases the new default CSS if you were customizing it in some specific way.
Adjusting your code should not be a big deal anyways, enjoy v3!



## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
