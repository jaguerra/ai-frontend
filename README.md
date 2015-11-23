# Build instructions

## Requirements

Relatively recent versions of:

* NodeJS <https://nodejs.org/>
* Ruby <https://www.ruby-lang.org/>
* Bower <http://bower.io/>

## Install build dependencies

    $ npm install -g bower
    $ npm install -g gulp
    $ gem install bundler
    $ npm install
    $ bower install
    $ bundle install

## Build commands

    $ gulp

Builds from source into the "dist" folder.

    $ gulp serve

Launches a live webserver on port 9000 for development. Any change made to source files is recompiled on the fly allowing a fast development cycle.

# Code architecture

We aim for a BEM style architecture for all the frontend code but with these additional constraints:

* We must include parts from Twitter Bootstrap which is not BEM compliant.
* We are basing all the work over code from https://www.amnesty.org/ which is close but not fully BEM compliant.

All the SCSS and JS styling and rules is mostly restricted by the built in linters so expect not much detail in this document.

## BEM principles to apply

We will stick to BEM on:

* CSS
* File and folder structure

We will adapt from BEM:

* Hypenated BEM syntax ( '--' instead of '\_' for modifiers). See <http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/>

We will not use from BEM:

* BEM JS libraries
* BEM tooling

## BEM (Block, Entity, Modifier) 101

**TL;DR**

BEM is a naming convention, composed of **Blocks**, **Elements** & **Modifiers**. It is particularly useful when your aim is to create reusable components (which should be most of the time!).

* **Blocks** are the outer container for a given component.
* **Elements** are child elements of a component.
* **Modifiers** are ways to create different variations of a component or element.

Instead of relying on the cascading aspect of CSS, the relationship between blocks and elements are encoded in the element's class. Blocks and elements are separated by two underscores (\_\_) and modifiers are separated by two dashes (--).

    /* The outer container */
    .block

    /* A sub element */
    .block__element

    /* A modified sub element */
    .block__element--modifier

### Resources

* Introduction to BEM and its core principles (slides) <https://speakerdeck.com/battaglr/bem>
* Hypenated BEM syntax <http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/>
* BEM for small projects (long read) <http://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/>

## Licence

Copyright (C) 2015 Amnesty International (originally developed by ICTI http://www.icti.es/). This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program (see LICENSE.txt). If not, see http://www.gnu.org/licenses/.
