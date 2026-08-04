/**
 * @typedef {{ name: string, browser_download_url: string }} GithubReleaseAsset
 */

/**
 * Selects the downloadable application asset, excluding checksum files.
 *
 * @param {GithubReleaseAsset[]} assets
 * @param {string} extension
 * @returns {GithubReleaseAsset | undefined}
 */
export function selectReleaseAsset(assets, extension) {
  return assets.find((asset) => asset.name.endsWith(extension));
}
