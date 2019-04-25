---
layout      : post
title       : jQuery MessageBox 3.1.0
description : Input type textarea has been added
tags        : [Releases, Javascript, jQuery, Plugin, MessageBox, Modal, Dialog, Alert, Confirm, Prompt]
---


A few months without a new release means that the plugin is pretty mature and reliable, or that the developer has been busy lately...
Thanks to a user request, here is a brand new release of jQuery MessageBox, which includes a new input type: `textarea`.


### What's new in version 3.1.0
- New input type `"textarea"` (alias `"memo"`)
- New input `resize` option for type `"textarea"`
- New input `rows` option for type `"textarea"`
- New customizable `messagebox_content_input_textarea` class in the external CSS file
- Input `autotrim` option for types `"text`, `"password"` and `"textarea"` now defaults to `true`
- Removed CSS head injection
- Enforced strict mode


#### New input type `"textarea"` (alias `"memo"`)
A brand new `"textarea"` input type is available! It even comes with an alias: `"memo"`. Use the form you prefer.

#### New input `resize` option for type `"textarea"`
Textareas are different animals compared to simple textboxes. You can control the **vertical** resizing with this option.

#### New input `rows` option for type `"textarea"`
See above. You can control the basic height of the textarea using this option. It is worth noting that a CSS `height` value used in a [`customClass`](/labs/jquery-message-box/#custom-buttons-configuration) will overwrite it.

#### New customizable `messagebox_content_input_textarea` class in the external CSS file
Use it to fine-tune textareas appearance. In the minimal external CSS file this is used just for vertical scrollbars.

#### Input `autotrim` option for types `"text`, `"password"` and `"textarea"` now defaults to `true`
Before it used to default to `false`. This way is more consistent with the plugin, but beware if your code is relying to the old default value!

#### Removed CSS head injection
CSS injection into the `head` of the document has been removed to comply with strict **Content-Security-Policy** `style-src` directives.
That CSS has been moved to the external default CSS file, don't forget to include it into your custom ones!

#### Enforced strict mode
It was about time...



## Download and documentation

Go to the Lab page: [MessageBox](/labs/jquery-message-box/)
