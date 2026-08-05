"use client";

import { useEffect, useState } from "react";
import { selectReleaseAsset } from "./github-release.mjs";

type DesktopReleaseCardProps = {
  number: string;
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
  number,
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
        const asset = selectReleaseAsset(
          latest.assets ?? [],
          assetExtension,
        );

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
    <article className="tool-row">
      <span className="tool-number" aria-hidden="true">
        {number}
      </span>
      <div className="tool-core">
        <p className="tool-field">Windows x64 · Direct download</p>
        <h3>{title}</h3>
        <div className="tool-actions">
          <a
            className="action-link action-link-primary"
            href={release.url}
            download
            aria-label={`Download ${title} ${release.version} for Windows`}
          >
            Download {format} <span aria-hidden="true">↓</span>
          </a>
          <a
            className="action-link"
            href={`https://github.com/${repository}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${title} source code in a new tab`}
          >
            Source <span aria-hidden="true">↗</span>
          </a>
        </div>
        <details className="tool-details">
          <summary>About</summary>
          <p>{description}</p>
        </details>
      </div>
      <p className="tool-technology" aria-live="polite">
        {technology} · {release.version} · {format}
      </p>
    </article>
  );
}
