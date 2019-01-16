<template>
<div class="footer_padding">
    <footer>
        <p>Copyright <a href="https://dantownsend.co.uk/">Daniel Townsend</a>, 2018</p>
        <ul>
            <li><router-link to="privacy">Privacy Policy</router-link></li>
        </ul>
    </footer>
</div>
</template>


<style lang="less">
div.footer_padding {
    height: 18rem;

    footer {
        background-color: black;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        a {
            color: white;
            text-decoration: underline;
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
