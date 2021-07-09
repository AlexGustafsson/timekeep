<template>
  <canvas ref="canvas" width="100" height="100" />
</template>

<script setup lang="ts">
// import { onMounted, ref } from "vue";

// export default {
//   setup(): Record<string, unknown> {
//     const canvas = ref<HTMLCanvasElement>();

//     const groups = [
//       {
//         name: "timekeep",
//         projects: [
//           {
//             name: "backend",
//             time: 10,
//           },
//           {
//             name: "frontend",
//             time: 20,
//           },
//           {
//             name: "design",
//             time: 15,
//           },
//         ],
//         color: "blue",
//         time: 10 + 20 + 15,
//       },
//       {
//         name: "other",
//         projects: [
//           {
//             name: "other",
//             time: 15,
//           },
//           {
//             name: "other",
//             time: 32,
//           },
//         ],
//         color: "green",
//         time: 15 + 32,
//       },
//     ];

//     const times = [10, 20, 15, 15, 32];

//     onMounted(() => {
//       if (!canvas.value) return;

//       const ctx = canvas.value.getContext("2d");
//       if (!ctx) return;

//       ctx.fillStyle = "red";
//       ctx.fillRect(0, 0, 100, 100);

//       const totalSeconds = groups.reduce((groupTime, group) => groupTime + group.time, 0);
//       const totalProjects = groups.reduce((projectCount, group) => projectCount + group.projects.length, 0);
//       let offset = 0;
//       for (let i = 0; i < groups.length; i++) {
//         const group = groups[i];
//         const radians = Math.max(2 * Math.PI - offset, (group.time / totalSeconds) * 2 * Math.PI);
//         ctx.strokeStyle = group.color;
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.arc(50, 50, 25, offset, radians);
//         ctx.stroke();
//         offset += radians;
//       }
//       for (let i = 0; i < totalProjects; i++) {
//         const radians = (i / totalProjects / 2) * 2 * Math.PI;
//         ctx.save();
//         ctx.translate(50, 50);
//         ctx.rotate(radians);
//         ctx.translate(-50, -50);
//         ctx.strokeStyle = "black";
//         ctx.lineWidth = 1;
//         ctx.setLineDash([2, 2]);
//         ctx.moveTo(25, 50);
//         ctx.lineTo(75, 50);
//         ctx.stroke();
//         ctx.restore();
//       }

//       ctx.save();
//       for (let i = 0; i < times.length; i++) {
//         const time = times[i];
//         const radians = (i / totalProjects) * 2 * Math.PI;
//         const x = 50 + Math.cos(radians) * 50 * (time / totalSeconds);
//         const y = 50 + Math.sin(radians) * 50 * (time / totalSeconds);
//         if (i == 0) {
//           ctx.beginPath();
//           ctx.moveTo(x, y);
//         } else {
//           ctx.lineTo(x, y);
//         }
//       }
//       ctx.strokeStyle = "black";
//       ctx.lineWidth = 2;
//       ctx.stroke();
//       ctx.restore();
//     });

//     return { canvas };
//   },
// };
</script>

<style scoped>
canvas {
  width: 100px;
  height: 100px;
}
</style>
