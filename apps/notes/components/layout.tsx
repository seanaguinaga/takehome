import React from "react";
import Menu from "./menu";

const Layout: React.FC = ({ children }) => {
  return (
    <ion-app>
      <ion-split-pane content-id="split-content" id="splitPane">
        <Menu />
        <div className="ion-page" id="split-content">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-button />
              </ion-buttons>
              <ion-title>Todos</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content fullscreen>{children}</ion-content>
        </div>
      </ion-split-pane>
    </ion-app>
  );
};

export { Layout };
