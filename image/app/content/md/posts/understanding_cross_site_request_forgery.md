# Cross Site Request Forgery

Cross Site Request Forgery (CSRF) is a well known security vulnerability which all developers must be aware of.

It's when a website uses cookies for authentication, and a logged in user clicks a malicious link on a third party website which makes a request which modifies the user's data in some way.

As an example, someone is logged into a banking website, `banking.com`. On a third party website `evil.com`, there's a link to `banking.com/account/transfer/`. When clicked, the browser will send along the user's session cookie for `banking.com`, and without any additional security measures the request would succeed.

## How to implement CSRF protection

There's a few simple simple ways to protect against CSRF. Here are two examples.

### How Django does it

Django set a CSRF cookie, which contains a random token. Within your HTML template, any forms which change state (i.e. POST/PUT/DELETE) need to add this token as a hidden field.

```html
<form action="/articles/" method="post">
    <!-- Adds a hidden field containing the CSRF token: -->
    {% csrf_token %}

    <!-- Adds the rest of the form fields: -->
    {{ form.as_p }}

    <input type="submit" value="Submit" />
</form>
```

When the form is submitted, the website also sends back the CSRF token contained in the cookie. Django checks that the token in the cookie matches the hidden field value in the form.

This protects against CSRF because a malicious website is unable to read/set cookies on another domain. So a malicious link on `evil.com` wouldn't know what value to set the hidden form field to.

If you have a Single Page Application, then Javascript is used to add the CSRF token as a header to all AJAX calls instead.

## CSRF protection and mobile apps

CSRF is only a problem with browsers. However, if you have an API which is used by mobile apps as well, you need to work around it.

CSRF protection usually involves more than just checking for the presence of a token - it also looks at the referer header. You could try spoofing all of this in the mobile app, so it sets all the appropriate HTTP headers manually.

It's generally just best to bypass CSRF checks for non-web apps, as it doesn't really serve a purpose. In Django's case, this is a by adding a `csrf_exempt` decorator to your view. This becomes a bit messy though if we need to maintain two separate views - one which enforces CSRF validation, and one that doesn't.

One limitation of Django is we can only apply middleware globally to all views. With ASGI, and frameworks like Starlette, we can apply middleware to a subsets of views.

With JWT based authentication, we can add a claim such as ``mobile``, which allows an app to access views without a CSRF token.

Conside this pseudo code:

```python
views = [view1, view2, view3]

app = Router({
    '/mobile': CheckJWTClaimMiddleware(views)
    '/web': CSRFMiddleware(views)
})

```

This allows us to support mobile and web apps.
