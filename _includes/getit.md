{% if page.getit.github %}
    ##### GitHub
    View project on [GitHub](https://github.com/{{ page.getit.github }})
{% endif %}
    
{% if page.getit.github and page.getit.download %}
    ##### Download
    Download latest [release](https://github.com/{{ page.getit.github }}/releases/latest)
{% endif %}

{% if page.getit.composer %}
    ##### Composer
    View the package on [Packagist](https://packagist.org/packages/{{ page.getit.composer }})
{% endif %}

{% if page.getit.npm %}
    ##### npm
    `npm install {{ page.getit.npm }}`
{% endif %}

{% if page.getit.bower %}
    ##### Bower
    `bower install {{ page.getit.bower }}`
{% endif %}

{% if page.getit.cdn %}
    ##### CDN
    {% if page.getit.cdn.js %}
        ```
        {% for item in page.getit.cdn.js %}
            <script src="//cdn.jsdelivr.net/{{ page.getit.cdn.name }}/latest/{{ item }}"></script>
        {% endfor %}
        ```
    {% endif %}
    {% if page.getit.cdn.css %}
        ```
        {% for item in page.getit.cdn.css %}
            <link rel="stylesheet" href="//cdn.jsdelivr.net/{{ page.getit.cdn.name }}/latest/{{ item }}">
        {% endfor %}
        ```
	{% endif %}
    See more information and all the available versions in the [CDN page](cdn/)
{% endif %}
