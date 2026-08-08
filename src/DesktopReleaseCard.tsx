"use client";

import { useEffect, useState } from "react";
import { Button, Link, Tag, Tile } from "@carbon/react";
import { selectReleaseAsset } from "./github-release.mjs";

type DesktopReleaseCardProps = {
  title: string;
  description: string;
  technology: string;
  format: string;
  repository: string;
  assetExtension: string;
  fallbackVersion: string;
  fallbackUrl: string;
};

type GithubRelease = {
  tag_name?: string;
  assets?: Array<{ name: string; browser_download_url: string }>;
};

export function DesktopReleaseCard({
  title,
  description,
  technology,
  format,
  repository,
  assetExtension,
  fallbackVersion,
  fallbackUrl,
}: DesktopReleaseCardProps) {
  const [release, setRelease] = useState({
    version: fallbackVersion,
    url: fallbackUrl,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadLatestRelease() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repository}/releases/latest`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) return;

        const latest = (await response.json()) as GithubRelease;
        const asset = selectReleaseAsset(latest.assets ?? [], assetExtension);

        if (latest.tag_name && asset) {
          setRelease({
            version: latest.tag_name,
            url: asset.browser_download_url,
          });
        }
      } catch {
        return;
      }
    }

    void loadLatestRelease();
    return () => controller.abort();
  }, [assetExtension, repository]);

  return (
    <article className="tool-card">
      <Tile className="tool-tile">
        <div className="tool-identity">
          <Tag size="sm" type="purple">Desktop</Tag>
          <p className="tool-field">Windows x64 · Direct download</p>
          <h3>{title}</h3>
        </div>
        <div className="tool-summary">
          <p>{description}</p>
          <span className="tool-detail">{technology} · {release.version} · {format}</span>
        </div>
        <div className="tool-actions">
          <Button as="a" className="simulator-link" download href={release.url} size="md">
            Download {title}
          </Button>
          <Link href={`https://github.com/${repository}`} rel="noopener noreferrer" target="_blank">
            View source ↗
          </Link>
        </div>
      </Tile>
    </article>
  );
}
