---
---
## Get it

{% if page.getit.github %}
    #### GitHub
    View project on [GitHub](https://github.com/gasparesganga/{{ page.getit.github }}]
    
    #### Download
    Download latest [release](https://github.com/gasparesganga/{{ page.getit.github }}/releases/latest)
{% endif %}

{% if page.getit.composer %}
    #### Composer
    `{{ page.getit.composer }}`
    View the package on [Packagist](https://packagist.org/packages/{{ page.getit.composer }})
{% endif %}

{% if page.getit.npm %}
    #### npm
    `npm install {{ page.getit.npm }}`
    View [package info](https://www.npmjs.com/package/{{ page.getit.npm }})
{% endif %}

{% if page.getit.bower %}
    #### Bower
    `bower install {{ page.getit.bower }}`
{% endif %}

{% if page.getit.cdn %}
    #### CDN
    You can find the latest version and all the cached ones in the [CDN page](cdn.html)
{% endif %}
