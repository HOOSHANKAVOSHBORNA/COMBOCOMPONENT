#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QQuickView>
#include <QWidget>

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);

    ~MainWindow();

private slots:
    void on_pushButton_clicked();

private:
    Ui::MainWindow *ui;
    QQuickView* qml;
    QWidget *widget;
};
#endif // MAINWINDOW_H
