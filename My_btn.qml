import QtQuick 2.0
import QtQuick.Controls 2.13
import Qt3D.Animation 2.10



Rectangle {
    property bool changiz: true
    id:rec
    width: 120
    height: 45
    color: "#319bef"
    radius: 23

    Timer{
        id:timer
    }

    Text {
        id: txt
        text: qsTr("open")
        anchors.verticalCenter: parent.verticalCenter
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.horizontalCenterOffset: 16
        color: "#fff"
    }
    Image {
        id: img
        x: 8
        y: 11
        source: "qrc:/up.png"

        anchors.right: txt.left
        width: 24
        height: 24
        anchors.rightMargin: 20
    }
    MouseArea{
        id: mouseArea
        anchors.fill: parent
        hoverEnabled: true
        onClicked: {
            if (changiz==true){
            txt.text="Waiting"
            img.visible=false
            busyIndicator.visible=true
            function delay(delayTime, cb) {
              timer.interval = delayTime;
              timer.repeat = false;
              timer.triggered.connect(cb);
              timer.start();
                }

            delay(3000,function(){
            rec.color="green"
            busyIndicator.visible=false
            txt.font.pixelSize=20
            txt.text="ok"
            txt.anchors.centerIn=rec
            img.visible=true
            img.source="qrc:/tick.png"

            changiz=false
            window_2.show()



                                    })
           }}

        onEntered: {
            if (changiz==true){

            img.source="qrc:/tick.png"
            }

        }
        onExited: {
            if (changiz==true){
            img.source= "qrc:/up.png"
            }
        }

        BusyIndicator {
            id: busyIndicator
            visible: false
            x: 8
            y: -1
            anchors.right: txt.left
            width: 40
            height: 40
            anchors.verticalCenter: parent.verticalCenter
            anchors.rightMargin: 11
        }
    }




}
