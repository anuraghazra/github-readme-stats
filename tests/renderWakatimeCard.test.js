require("@testing-library/jest-dom");
const renderWakatimeCard = require("../src/cards/wakatime-card");

const { wakaTimeData } = require("./fetchWakatime.test");

describe("Test Render Wakatime Card", () => {
  it("should render correctly", () => {
    const card = renderWakatimeCard(wakaTimeData);

    expect(card).toMatchInlineSnapshot(`
      "
            <svg
              width=\\"495\\"
              height=\\"150\\"
              viewBox=\\"0 0 495 150\\"
              fill=\\"none\\"
              xmlns=\\"http://www.w3.org/2000/svg\\"
            >
              <style>
                .header {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                  fill: #2f80ed;
                  animation: fadeInAnimation 0.8s ease-in-out forwards;
                }
                
          
          .stat {
            font: 600 14px 'Segoe UI', Ubuntu, \\"Helvetica Neue\\", Sans-Serif; fill: #333;
          }
          .stagger {
            opacity: 0;
            animation: fadeInAnimation 0.3s ease-in-out forwards;
          }
          .rank-text {
            font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333; 
            animation: scaleInAnimation 0.3s ease-in-out forwards;
          }
          
          .bold { font-weight: 700 }
          .icon {
            fill: #4c71f2;
            display: none;
          }
          
          .rank-circle-rim {
            stroke: #2f80ed;
            fill: none;
            stroke-width: 6;
            opacity: 0.2;
          }
          .rank-circle {
            stroke: #2f80ed;
            stroke-dasharray: 250;
            fill: none;
            stroke-width: 6;
            stroke-linecap: round;
            opacity: 0.8;
            transform-origin: -10px 8px;
            transform: rotate(-90deg);
            animation: rankAnimation 1s forwards ease-in-out;
          }
          
        
          .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
          

                
              </style>

              undefined

              <rect
                data-testid=\\"card-bg\\"
                x=\\"0.5\\"
                y=\\"0.5\\"
                rx=\\"4.5\\"
                height=\\"99%\\"
                stroke=\\"#E4E2E2\\"
                width=\\"494\\"
                fill=\\"#fffefe\\"
                stroke-opacity=\\"1\\"
              />

              
            <g
              data-testid=\\"card-title\\"
              transform=\\"translate(25, 35)\\"
            >
              <g transform=\\"translate(0, 0)\\">
            <text
              x=\\"0\\"
              y=\\"0\\"
              class=\\"header\\"
              data-testid=\\"header\\"
            >Wakatime Week Stats</text>
          </g>
            </g>
          

              <g
                data-testid=\\"main-card-body\\"
                transform=\\"translate(0, 55)\\"
              >
                
          <svg x=\\"0\\" y=\\"0\\" width=\\"100%\\">
            <g transform=\\"translate(0, 0)\\">
          <text x=\\"25\\" y=\\"11\\" class=\\"stat bold\\" fill=\\"#333\\">No coding activity this week</text>
        </g>
          </svg> 
        
              </g>
            </svg>
          "
    `);
  });
  it("should render translations", () => {
    document.body.innerHTML = renderWakatimeCard({}, {lang: "cn"})
    expect(document.getElementsByClassName("header")[0].textContent).toBe("Wakatime周统计")
    expect(document.querySelector("g[transform=\"translate(0, 0)\"]>text.stat.bold").textContent).toBe("本周没有编码活动")
  })
});
