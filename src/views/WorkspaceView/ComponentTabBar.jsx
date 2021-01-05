import React from "react";
import './Workspace.css'
import {ComponentTab} from "./ComponentTab";

export class ComponentTabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        height: '38px',
        minHeight: '38px',
        display: "flex",
        flexDirection: "row"
      }} key="componentTabBar">
        {
          Object.keys(this.props.tabs)
            .map((tabId) => {
              let tab = this.props.tabs[tabId]
              if(Object.keys(tab).length>0) {
                return this.getTab(tabId);
              }else{
                return (<div/>);
              }
            })
        }
      </div>
    )
  }

  removeTab(tab) {
    let tabs = this.props.tabs;
    tabs[tab.tabId] = {};
    this.setState({tabs: tabs});
  }

  getTabIdx(tabId) {
    for (let i = 0; i < this.props.tabs.length; i++) {
      if (this.props.tabs[i].tabId === tabId)
        return i;
    }

    return 0;
  }

  getTab(tabId) {
    let tab = this.props.tabs[tabId];
    return (
      <ComponentTab key={tabId}
                    value={this.props.currentTab}
                    data={tab}
                    onTabSelection={this.props.onTabSelection}
                    onClose={(tab) => this.removeTab(tab)}/>
    )
  }

}