---
title: Netlify vs Self Hosting
date: 2020-02-15
description: A look at the pros and cons of using a service like Netflify to host a static website, vs self hosting.
---

This is a little off topic from the usual [Python articles](..), but I recently migrated this website to [Netlify](https://www.netlify.com/) for hosting.

Before that, it was hosted on my own server inside a [Docker](https://www.docker.com/) container. The deploy process was:

 * Build the Docker image
 * Push the image to a registry
 * SSH onto the server, pull the new image, and recreate the container

That workflow isn't too bad if you're deploying once a week or so. But it's pretty tedious if you do a deployment, realise there's a typo, and then have to go through it all over again.

You might wonder why it needed to be in a Docker container. It's because the rest of my infrastructure requires it. However, the same downsides apply if you're just manually building and deploying static files to your own webserver.

There are many services out there for hosting static websites. Netlify does have a very slick solution though.

When you push a build to Github, Netlify is notified via web hooks, which then triggers a build and automatic deployment. In most situations no manual work is required by the developer once this workflow is setup. The website is deployed to a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), which results in fast load times throughout the world. The final cherry on top is that SSL is automatically configured too.

So with all these advantages, would you ever host a static website yourself?

In a post-[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) world, tools like Google Analytics aren't an effective measure for website engagement, as users should be allowed to opt out of tracking. The only true measure of engagement is web server logs. Whilst this isn't a perfect solution, because some traffic isn't recorded due to caching, and bots add a lot of noise, it's still valuable to have. By using a static host, you are losing this granularity. Netlify offers it's own analytics solution as a paid add on.

Talking about paid add-ons, if you really went to town with Netlify, you could end up incurring some fairly high costs. For a more ambitious site with a large team, weigh up the costs carefully vs just hosting it via Nginx on your own server. This isn't to suggest that Netlify is overpriced, it's just the nature of services like this. The same is true with AWS.

Also, be wary of putting a square peg in a round hole. For example, if your app has lots of dynamic content, authentication, and backend services, you're probably best off hosting that yourself, or at least looking for some other alternative.

Where services like Netlify really shine are with open source. Being able to accept a pull request into master, and then those changes instantly go live, is such a nice workflow and time saver.

These Git driven workflows are super powerful. Sure, you can configure your own Continuous Deployment (CD) pipeline using something like [Circle CI](https://circleci.com/) or [Travis](https://travis-ci.com/), but services like Netlify, which effectively offer CD as a service, are sure to grow more popular.
