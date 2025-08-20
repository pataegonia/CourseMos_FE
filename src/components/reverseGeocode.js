import { loadKakao } from "./kakaoLoader";

// 도로명/지번 주소 역지오코딩
export default async function reverseGeocode(lat, lng) {
  await ensureKakao();
  return new Promise((resolve) => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK && result?.length) {
        const r = result[0];
        const addr = r.road_address?.address_name || r.address?.address_name || "";
        resolve(addr);
      } else {
        resolve("");
      }
    });
  });
}

// 행정구역명(시/도 + 시군구 + 읍면동) → "경기도 성남시 분당구" 등
export async function regionName(lat, lng) {
  await ensureKakao();
  return new Promise((resolve) => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);

    geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), (result, status) => {
      if (status !== kakao.maps.services.Status.OK || !result?.length) return resolve("");

      const pick =
        result.find((r) => r.region_type === "H") ||
        result.find((r) => r.region_type === "B") ||
        result[0];

      const parts = [
        pick.region_1depth_name,
        pick.region_2depth_name,
        pick.region_3depth_name,
      ].filter(Boolean);

      resolve(parts.join(" "));
    });
  });
}

async function ensureKakao() {
  if (window.kakao?.maps?.services) return;
  const key = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!key) throw new Error("[Kakao] VITE_KAKAO_JS_KEY missing");
  await loadKakao(key);
}
