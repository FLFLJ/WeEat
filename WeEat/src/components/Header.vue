<template>
  <div id="header">
    <div id="nav">
      <h3>This Is You Bro:</h3>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#header {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 1000000000;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.meName{display: flex;justify-content: center;align-items: center;}
</style>