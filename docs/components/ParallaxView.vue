<script setup>
</script>

<template>
  <div class="parallax p1"></div>
  <div class="content" style="background-color: #2c3e50;">
    <p>
    </p>
    <p>
    </p>
  </div>
  <div class="parallax p2"></div>
  <div class="content" style="background-color: #6880a6">
    <p>
    </p>
    <p>
    </p>
  </div>
  <div class="parallax p3"></div>
  <div class="content" style="background-color: #bdc2d5">
    <p style="color: #c89263">
    </p>
    <p style="color: #c89263">
    </p>
  </div>
  <div class="parallax p4"></div>
</template>

<style scoped>
.parallax{
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
  z-index: 0;
}

.p1{
  background-image: url("/5_centimeter_per_sec/Screenshot 2025-03-12 at 3.40.46 PM.png");
}

.p2{
  background-image: url("/5_centimeter_per_sec/Screenshot 2025-03-12 at 3.43.54 PM.png");
}

.p3{
  background-image: url("/5_centimeter_per_sec/Screenshot 2025-03-12 at 3.56.49 PM.png");
}

.p4{
  background-image: url("/5_centimeter_per_sec/Screenshot 2025-03-12 at 3.43.54 PM.png");
}


.link-style:hover .svg-container{
  animation: moveLeftRight 0.7s ease-in-out infinite alternate;
}

@keyframes moveLeftRight {
  0%{
    transform: translateX(+2px);
  }
  25% {
    transform: translateX(+5px);
  }
  100% {
    transform: translateX(-0px);
  }
}

.introduction p{
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 10px 10px 0 10px;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 1px;
  text-align: center;
  color: #282828;
}

.content{
  width: 100%;
  height: 30vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  text-align: center;

}

.content p{
  color: #edb98f;
  font-family: Futura, sans-serif;
  font-size: 25px;
  font-weight: bold;
  padding-top: 15%;
}

</style>