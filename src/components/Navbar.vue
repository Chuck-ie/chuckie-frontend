<template>

    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Projects">Projects</router-link></li>
        <li><router-link to="/About">About</router-link></li>
    </ul>

</template>

<style scoped>

ul {
    border: 1px solid var(--border-color);
    background-color: var(--header-color);
    padding: 5px;
    margin-top: 0;
    margin-bottom: 10px;
}

li {
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
}

</style>
