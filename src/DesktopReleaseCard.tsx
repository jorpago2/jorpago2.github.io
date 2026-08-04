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
  theme: string;
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
  theme,
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
    <article className={`simulator desktop-tool ${theme}`}>
      <a
        className="simulator-link"
        href={release.url}
        download
        aria-label={`Download ${title} ${release.version} for Windows`}
      />
      <div className="simulator-heading">
        <span className="number">{number}</span>
        <span className="field">Windows x64 · Direct download</span>
      </div>
      <div className="simulator-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="simulator-footer">
        <span className="detail">
          {technology} · {release.version} · {format}
        </span>
        <a
          className="source-link"
          href={`https://github.com/${repository}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
