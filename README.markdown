This is example client for [PDC] that provides somewhat comfortable to view
contacts for components.

[PDC]: https://github.com/release-engineering/product-definition-center


# Usage

Set up PDC server and other options in `serversetting.json` (template is
`serversetting.json.dist`), then enjoy.

# Development

Install `npm` (probably from your package manager).

    $ npm install
    $ npm start 
    # Listening at http://localhost:3000/
    # Open http://localhost:3000/ in browser for testing
    
If you did not install node module globally, you need to add
`node_modules/.bin` to your `PATH`.

# Known issue

If you met error 'Authorization Required', please open the server you configured and check if this connection is untrusted.
If so, please add the exception in your browser.

# Customization

The `serversettings.json` can contain extra field that tweak the look of the
UI. Available keys are:

* `logo`: a URL to an image that will be inserted into the header; it will be
  rendered 20px high
* `customStyle`: a URL to a stylesheet that will be injected into the page and
  can override anything

Relative URLs will be resolved relatively to the location with
`serversettings.json` file.

Additionally, you can add links to related services to the header. Just add
`links` key and set its value to a list of two-item lists. The first element in
the inner list is a URL, the second is a link label.

```json
{
    "links": [
        ["https://google.com", "Google"]
    ]
}
```

A custom footer can be set in `templates/footer.html` file. The file should
contain single HTML element with class name "footer" which will be rendered at
bottom of the web page. An optional element with class name "version" can be
used as placeholder for current application version.
