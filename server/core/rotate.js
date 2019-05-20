


// const start = 0;

// const end = 24;

// const totalDuration = end - start;

// const n = 3;
// const serverLife = 18;
// const commonDuration = (serverLife * n - totalDuration) / (n + 1);
// const soloDuration = serverLife - 2 * commonDuration;

// let servers = {};

// for (let i = 0; i < n; i++) {//定义第一台机休息时间
//     let begin = commonDuration + soloDuration;
//     let end = soloDuration + commonDuration * (n - 1) + soloDuration * (n - 1);

//     let offset = i * soloDuration + commonDuration * (i == 0 ? 0 : i - 1);

//     begin = begin + offset;
//     end = end + offset;



//     begin = begin >= 24 ? begin % 24 : begin;
//     end = end > 24 ? end % 24 : end;

//     servers[i] = {
//         begin: begin,
//         end: end,
//     }
// }

// /*     for (let i = 0; i < n; i++) {//定义第一台机活跃时间
//         let begin, end;
//         if (!(i % 2)) {
//             begin = -commonDuration;
 
//         } else {
//             begin = commonDuration * (i - 1) + soloDuration * (i);
 
//         }
//         end = begin + serverLife;
 
//         servers[i] = {
//             begin: begin,
//             end: end,
//         }
//     } */
// console.log('\n');
// console.log(servers);
// console.log("commonDuration", commonDuration);
// console.log("soloDuration", soloDuration);

// console.log(0 % 2);
// console.log(1 % 2);
// console.log(2 % 2);
// console.log(3 % 2);

// console.log('\n');















