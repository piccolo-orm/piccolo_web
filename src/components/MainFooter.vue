<template>
    <div class="footer_padding">
        <footer>
            <ul>
                <li>
                    <a
                        href="https://www.youtube.com/channel/UCE7x5nm1Iy9KDfXPNrNQ5lA"
                        ><font-awesome-icon
                            :icon="['fab', 'youtube']"
                        />YouTube</a
                    >
                </li>

                <li>
                    <a href="https://twitter.com/piccolo_orm"
                        ><font-awesome-icon
                            :icon="['fab', 'twitter']"
                        />Twitter</a
                    >
                </li>

                <li>
                    <a href="https://github.com/piccolo-orm/"
                        ><font-awesome-icon
                            :icon="['fab', 'github']"
                        />GitHub</a
                    >
                </li>

                <li>
                    <a href="https://piccolo-orm.com/feed.xml"
                        ><font-awesome-icon :icon="'rss'" />Feed</a
                    >
                </li>
            </ul>

            <p>
                Copyright
                <a href="https://dantownsend.co.uk/">Daniel Townsend</a>, 2022
            </p>
            <ul>
                <li>
                    <g-link to="/privacy">Privacy Policy</g-link>
                </li>
            </ul>
        </footer>
    </div>
</template>


<style lang="less">
@import "../variables.less";

div.footer_padding {
    height: 12rem;

    footer {
        background-color: @light_blue;
        box-sizing: border-box;
        padding: 3rem 1rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        p,
        li {
            font-size: 0.9rem;
        }

        p {
            color: white;
            text-align: center;
            margin: 0;
        }

        ul {
            padding: 0;
            text-align: center;

            li {
                color: white;
                display: inline-block;
                padding: 0 1rem;

                svg {
                    margin-right: 0.3rem;
                }
            }
        }
    }
}
</style>
