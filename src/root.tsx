// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { SideMenu } from "~/components/SideMenu";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Notas Meas</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="manifest" href="/manifest.json" />
      </Head>

      <Body>
        <main class="mx-auto my-8 w-80">
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>

          <SideMenu />
        </main>

        <Scripts />
      </Body>
    </Html>
  );
}
