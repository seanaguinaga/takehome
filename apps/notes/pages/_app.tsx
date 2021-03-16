/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";
import "@ionic/core/css/display.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/typography.css";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import { HasuraProvider } from "@takehome/hasura";
import { enableStaticRendering } from "mobx-react-lite";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { ReactNode, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Layout } from "../components/layout";
import { CoreStoreProvider } from "../core/store";
import { webCoreStore } from "../web/core/store";

enableStaticRendering(typeof window === "undefined");

function MyApp({
  Component,
  pageProps,
  router,
}: AppProps & { Component: { getLayout: (page: ReactNode) => ReactNode } }) {
  useEffect(() => {
    ionDefineCustomElements(window);
  });

  let getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        router.reload();
      }}
    >
      <Suspense
        fallback={
          <ion-progress-bar
            type="indeterminate"
            style={{ position: "absolute", bottom: 0 }}
          />
        }
      >
        <CoreStoreProvider.Provider value={webCoreStore}>
          <HasuraProvider>
            {getLayout(<Component {...pageProps} />)}
          </HasuraProvider>
        </CoreStoreProvider.Provider>
      </Suspense>
    </ErrorBoundary>
  );
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <ion-app>
      <ion-content>
        <ion-item>
          <ion-label>Something went wrong.</ion-label>
          <ion-button slot="end" onClick={resetErrorBoundary}>
            Reload
          </ion-button>
        </ion-item>
        <ion-item>{error.message}</ion-item>
      </ion-content>
    </ion-app>
  );
}

export default MyApp;
