const {touchDown, touchMove, touchUp, usleep, appActivate, keyDown, keyUp} = at;

function main() {
    touchDown(6, 65.69, 77.82);
    usleep(116358.0);
    touchUp(6, 65.69, 77.82);
    usleep(1482138.67);
  
    touchDown(2, 179.62, 80.87);
    usleep(116470.21);
    touchUp(2, 179.62, 80.87);
    usleep(2518013.58);
  
    at.inputText('ensure nuoc');
    at.usleep(2000000);
  
    touchDown(3, 651.76, 1302.63);
    usleep(149963.33);
    touchUp(3, 651.76, 1302.63);
}
main();