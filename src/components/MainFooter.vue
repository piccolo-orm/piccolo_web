<template>
    <div class="footer_padding">
        <footer>
            <p>
                Copyright
                <a href="https://dantownsend.co.uk/">Daniel Townsend</a>, 2021
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
    height: 15rem;

    footer {
        background-color: @light_blue;
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
            padding: 6rem 1rem 0rem;
            text-align: center;
            margin: 0;
        }

        ul {
            padding: 0 0 5rem;
            text-align: center;

            li {
                color: white;
                display: inline-block;
            }
        }
    }
}
</style>
