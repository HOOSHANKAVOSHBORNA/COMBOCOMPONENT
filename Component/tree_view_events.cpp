#include "tree_view_events.h"
#include <QDebug>
tree_view_events::tree_view_events(QObject *parent) : QObject(parent)
{

}

void tree_view_events::onClicked(QString text)
{
    qDebug()<< text;


}

void tree_view_events::onCurrentIndexChanged()
{

}

void tree_view_events::onRootIndexChanged()
{

}


