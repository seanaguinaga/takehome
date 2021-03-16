import { bookmarkOutline } from "ionicons/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface AppPage {
  url: string;
  ios: string;
  md: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/",
    ios: "home-outline",
    md: "home-sharp",
  },
  {
    title: "Example",
    url: "/example",
    ios: "grid-outline",
    md: "grid-sharp",
  },
  {
    title: "Auth",
    url: "/auth",
    ios: "key-outline",
    md: "key-sharp",
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  let router = useRouter();

  return (
    <ion-menu content-id="split-content" side="start">
      <ion-content>
        <ion-list id="inbox-list">
          <ion-list-header>PreConception</ion-list-header>
          <ion-menu-toggle auto-hide="false">
            <Link href="/example" as="/">
              <a>
                <ion-note>order you tests</ion-note>
              </a>
            </Link>
          </ion-menu-toggle>
          {appPages.map((appPage, index) => {
            return (
              <Link href={appPage.url} key={index}>
                <ion-menu-toggle key={appPage.title} auto-hide="false">
                  <ion-item
                    class={router.pathname === appPage.url ? "selected" : ""}
                    lines="none"
                    detail={false}
                  >
                    <ion-icon slot="start" ios={appPage.ios} md={appPage.md} />
                    <ion-label>{appPage.title}</ion-label>
                  </ion-item>
                </ion-menu-toggle>
              </Link>
            );
          })}
        </ion-list>
        <ion-list id="labels-list">
          <ion-list-header>Labels</ion-list-header>
          {labels.map((label, index) => (
            <ion-item lines="none" key={index}>
              <ion-icon slot="start" icon={bookmarkOutline} />
              <ion-label class="idk">{label}</ion-label>
            </ion-item>
          ))}
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-buttons>
            <ion-button>Hello</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>
  );
};

export default Menu;
