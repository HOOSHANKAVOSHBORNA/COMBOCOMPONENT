

import PyQt5.QtCore as cr
import PyQt5.QtWidgets as wd
# import PyQt5.QtGui as gui
import sys

class Section(wd.QWidget):
    def __init__(self, title="", animationDuration=100, parent=None):
        super().__init__(parent)
        self.animationDuration = animationDuration
        self.toggleButton = wd.QToolButton(self)
        self.headerLine = wd.QFrame(self)
        self.toggleAnimation = cr.QParallelAnimationGroup(self)
        self.contentArea = wd.QScrollArea(self)
        self.mainLayout = wd.QGridLayout(self)
    
        self.toggleButton.setStyleSheet("QToolButton {border: none;}")
        self.toggleButton.setToolButtonStyle(cr.Qt.ToolButtonTextBesideIcon)
        self.toggleButton.setArrowType(cr.Qt.RightArrow)
        self.toggleButton.setText(title)
        self.toggleButton.setCheckable(True)
        self.toggleButton.setChecked(False)
    
        self.headerLine.setFrameShape(wd.QFrame.HLine)
        self.headerLine.setFrameShadow(wd.QFrame.Sunken)
        self.headerLine.setSizePolicy(wd.QSizePolicy.Expanding, wd.QSizePolicy.Maximum)
    
        # self.contentArea.setLayout(wd.QHBoxLayout())
        self.contentArea.setSizePolicy(wd.QSizePolicy.Expanding, wd.QSizePolicy.Fixed)
    
        # start out collapsed
        self.contentArea.setMaximumHeight(0)
        self.contentArea.setMinimumHeight(0)
    
        # let the entire widget grow and shrink with its content
        self.toggleAnimation.addAnimation(cr.QPropertyAnimation(self, b"minimumHeight"))
        self.toggleAnimation.addAnimation(cr.QPropertyAnimation(self, b"maximumHeight"))
        self.toggleAnimation.addAnimation(cr.QPropertyAnimation(self.contentArea, b"maximumHeight"))
    
        self.mainLayout.setVerticalSpacing(0)
        self.mainLayout.setContentsMargins(0, 0, 0, 0)
    
        row = 0
        self.mainLayout.addWidget(self.toggleButton, row, 0, 1, 1, cr.Qt.AlignLeft)
        self.mainLayout.addWidget(self.headerLine, row, 2, 1, 1)
        self.mainLayout.addWidget(self.contentArea, row+1, 0, 1, 3)
        self.setLayout(self.mainLayout)
    
        self.toggleButton.toggled.connect(self.toggle)
        
    def setContentLayout(self, contentLayout):
        layout = self.contentArea.layout()
        del layout
        self.contentArea.setLayout(contentLayout)
        collapsedHeight = self.sizeHint().height() - self.contentArea.maximumHeight()
        contentHeight = contentLayout.sizeHint().height()
        for i in range(0, self.toggleAnimation.animationCount()-1):
            SectionAnimation = self.toggleAnimation.animationAt(i)
            SectionAnimation.setDuration(self.animationDuration)
            SectionAnimation.setStartValue(collapsedHeight)
            SectionAnimation.setEndValue(collapsedHeight + contentHeight)
        contentAnimation = self.toggleAnimation.animationAt(self.toggleAnimation.animationCount() - 1)
        contentAnimation.setDuration(self.animationDuration)
        contentAnimation.setStartValue(0)
        contentAnimation.setEndValue(contentHeight)

    def toggle(self, collapsed):
        if collapsed:
            self.toggleButton.setArrowType(cr.Qt.DownArrow)
            self.toggleAnimation.setDirection(cr.QAbstractAnimation.Forward)
        else:
            self.toggleButton.setArrowType(cr.Qt.RightArrow)
            self.toggleAnimation.setDirection(cr.QAbstractAnimation.Backward)
        self.toggleAnimation.start()
    

if __name__ == '__main__':
    class Window(wd.QMainWindow):
        def __init__(self, parent=None):
            super().__init__(parent)
            section = Section("Section", 100, self)
    
            anyLayout = wd.QVBoxLayout()
            anyLayout.addWidget(wd.QLabel("Some Text in Section", section))
            anyLayout.addWidget(wd.QPushButton("Button in Section", section))
        
            section.setContentLayout(anyLayout)
            
            self.place_holder = wd.QWidget()  # placeholder widget, only used to get acces to wd.QMainWindow functionalities
            mainLayout = wd.QHBoxLayout(self.place_holder)
            mainLayout.addWidget(section)
            mainLayout.addStretch(1)
            self.setCentralWidget(self.place_holder)
    app = wd.QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())

