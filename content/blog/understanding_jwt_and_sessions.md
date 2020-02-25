---
title: Understanding JWT and Sessions
date: 2019-08-10
description: The pros and cons of JWT and sessions, and when to use them.
draft: false
---

When it comes to authenticating your web app, there are two main choices - session auth and token auth.

## JWT (JSON Web Token)

There are many different kinds of token auth, but JWT is a popular format.

When a user logs in, we provide them with a JSON payload, which can contain any information we want, such as a user_id, permissions, favourite colour of car etc. This payload is signed using a secret key, so when the user presents this token to us (for example, in an API request), we can verify it hasn't been tampered with.

## JWT Pros

### Stateless

This is often given as an advantage of JWT. In theory, since all the information is embedded within the token itself, there's no need to do database calls, like with session auth, to work out who the user is.

In reality though, most robust JWT systems still require some database calls. For example, we might implement a blacklist for tokens, and often that blacklist will be stored in a database. And even though we get the user ID from the token, we might still want to get extra information about that user, such as whether their account has been deactivated.

### Cross domain

Once you have a token, you can access an API from anywhere. This is great for mobile apps, and single page applications.

### Mobile and Machine-to-Machine friendly

Tokens are slightly easier to use for mobile phone apps, embedded systems, and micro services.

Most networking libraries do support cookies though, even those on native apps. At the end of the day, cookies are still just HTTP headers.

## JWT Cons

### Size

Tokens are larger than session IDs, so they consume more network bandwidth.

### Javascript tampering

We can't use local storage for storing our token, in case malicious Javascript gets on our webpage.

There are many ways this can happen:

 * Cross Site Scripting
 * Javascript from a CDN has been compromised
 * Malicious browser extensions

It's trivial for any malicious Javascript to read a token from local storage, and send it to third party server, where a hacker now has complete control of your account until the token expires.

Malicious Javascript is never good. The attacker can bind listeners to password fields, login forms, payment forms etc. However, to compromise a login form, the malicious Javascript has to be injected on the login page. With tokens, a hacker can compromise any part of your site (e.g. a blog comments section), and they can get your token from local storage.

So should we use token auth in web apps? We can still store it in a cookie, but that means a web app running on `app.foo.com` can't access `api.foo.com`. To get around this limitation, you can setup a proxy api running on `app.foo.com`, which forwards requests to `api.foo.com`.

### Stale data

Even though you can store lots of data in a JWT, it doesn't mean you should. If you include 'permissions' in your token, those permissions won't expire until the token does. Also, without some kind of blacklist, you can't revoke someone's token until it expires.

## Sessions

Session auth is the stalwart of web authentication. When a user logs in, the web server sets a HTTP-Only cookie containing a session ID. Whenever a request is made to the domain which set the cookie, the cookie is sent in the header.

The web server stores a reference (usually in a database) for the session id, mapping it to the user it belongs to, an expiry date, and any other arbitrary information you want to store for the duration of the session. Each time a request is made, the session expiry is usually updated in the database, so the user only has to login again after say 20 minutes of inactivity, rather than just 20 minutes from when they last logged on.

## Session Pros

### Well understood

Sessions are well understood. Most of the large web frameworks use them (e.g. Django).

### Immune to Javascript tampering

Web browers have built in security around HTTP-Only cookies, which makes them secure. If some malicious Javascript was present on your web page it could still cause some serious damage (e.g. making AJAX calls on your behalf), but they can't extract your session token. As soon as the user closes the webpage, the attack will stop.

## Session Cons

### CSRF

This is the big problem with session auth. Since the cookies are sent with every web request to the matching domain, a malicious third party website can make requests on a user's behalf. However, it's a well understood problem and all major web frameworks have some kind of CSRF mitigation in place.

### Same domain only

The same domain constraint can be challenging. Can proxy via the backend server though.

## Conclusions

So which should you use? Tokens are generally preferable on mobile and embedded systems, because they're so easy to work with - call a JSON endpoint, and get a token, then just add that to the header of all future API calls.

With cookies, you have to login, extract the session cookie from the header, configure a cookie jar, and add the cookie to it. It's still not too bad - but some libraries make this harder than others, whilst adding tokens to headers is universally pretty simple. Most endpoints which are protected by session cookies are also protected by CSRF tokens, which also need to be taken into account.

For web applications, session auth makes a lot more sense, mostly for security reasons. Storing tokens in local storage is risky, and if you put the token inside a cookie, you may as well just use session auth. Browser vendors might work out some way of securely storing tokens in the future, but I don't know what this would look like - especially as cookies effectively solve this problem already.
