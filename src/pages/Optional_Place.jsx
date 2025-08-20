import { useEffect, useState } from "react";
import ProgressDock from "../components/ProgressDock.jsx";
import KakaoMapPickerModal from "../components/KakaoMapPickerModal.jsx";
import reverseGeocode, { regionName } from "../components/reverseGeocode.js";
import { loadKakao } from "../components/kakaoLoader";

const DEFAULT_POS = { lat: 37.5665, lng: 126.9780 };

export default function Optional_Place({
  onPrev,
  onNext,
  currentStep = 3,
  totalSteps = 4,
}) {
  const [geoStatus, setGeoStatus] = useState("idle"); // idle|prompt|granted|denied|error
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState("");
  const [coords, setCoords] = useState(DEFAULT_POS);
  const [selectedPlace, setSelectedPlace] = useState("기본 위치");
  const [openMap, setOpenMap] = useState(false);

  // SDK 선로딩(모달과 충돌 없이 동일 Promise 공유)
  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_JS_KEY;
    loadKakao(key)
      .then(() => {
        setSdkReady(true);
        setSdkError("");
      })
      .catch((e) => {
        setSdkReady(false);
        setSdkError(e?.message || "Kakao SDK load failed");
        console.debug("Kakao SDK error:", e, "requested:", window.__lastKakaoSrc);
      });
  }, []);

  // 권한 상태 확인 + 최초 시도 (SDK 준비 이후)
  useEffect(() => {
    if (!sdkReady) return;
    let cancelled = false;

    async function init() {
      try {
        if (navigator.permissions?.query) {
          const p = await navigator.permissions.query({ name: "geolocation" });
          if (cancelled) return;

          if (p.state === "granted") {
            setGeoStatus("granted");
            getCurrentPosition();
          } else if (p.state === "prompt") {
            setGeoStatus("prompt");
            getCurrentPosition();
          } else {
            setGeoStatus("denied");
          }

          p.onchange = () => {
            if (cancelled) return;
            setGeoStatus(p.state);
          };
        } else {
          getCurrentPosition();
        }
      } catch {
        setGeoStatus("error");
      }
    }

    init();
    return () => { cancelled = true; };
  }, [sdkReady]);

  function getCurrentPosition() {
    if (!("geolocation" in navigator)) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus((s) => (s === "denied" ? "denied" : "prompt"));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const curr = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(curr);
        setGeoStatus("granted");

        try {
          const admin = await regionName(curr.lat, curr.lng);
          setSelectedPlace(admin || "현위치");
          // 필요 시 상세주소 병기:
          // const addr = await reverseGeocode(curr.lat, curr.lng);
          // setSelectedPlace(admin ? `${admin} · ${addr}` : (addr || "현위치"));
        } catch {
          setSelectedPlace("현위치");
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGeoStatus("denied");
        else setGeoStatus("error");
        setCoords(DEFAULT_POS);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  const handleUseCurrent = () => {
    getCurrentPosition();
  };

  const handlePickOnMap = async (place) => {
    const next = { lat: place.lat, lng: place.lng };
    setCoords(next);

    const admin = await regionName(next.lat, next.lng);
    if (admin) {
      setSelectedPlace(admin);
    } else {
      const addr = await reverseGeocode(next.lat, next.lng);
      setSelectedPlace(addr || place.address || place.name || "지도에서 선택");
    }
    setOpenMap(false);
  };

  // 모달 열릴 때 스크롤/터치 잠금
  useEffect(() => {
    if (openMap) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [openMap]);

  return (
    <div className="h-screen relative flex items-center justify-center">
      <ProgressDock current={currentStep} total={totalSteps} labels={["date","time","place","etc"]} />

      <div className="w-[86vw] max-w-[720px] bg-white/85 backdrop-blur rounded-3xl shadow-lg border border-white/40 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">장소 선택</h2>

        {!sdkReady && !sdkError && (
          <div className="mb-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 p-3">
            지도를 준비하는 중…
          </div>
        )}
        {sdkError && (
          <div className="mb-4 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 p-3 text-sm">
            <div className="font-semibold">지도 로딩 실패</div>
            <div className="mt-1">원인: {sdkError}</div>
            <div className="mt-1 text-gray-600 break-all">
              요청 URL: {window.__lastKakaoSrc || "-"}
            </div>
            <div className="mt-2 text-gray-700">
              Network 탭에서 위 URL 상태코드를 확인해봐.
              401/403 ⇒ 키·도메인 문제, (blocked)/canceled ⇒ 확장/망 차단
            </div>
          </div>
        )}

        {geoStatus === "denied" && (
          <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 p-3">
            위치 권한이 차단되어 있습니다.<br />
            주소창 왼쪽 🔒 → <b>사이트 설정</b> → <b>위치 허용</b> 후 <b>권한 재시도</b>를 눌러주세요.<br />
            개발은 <code>http://localhost:5173</code>, 배포는 <b>HTTPS</b> 권장.
          </div>
        )}
        {geoStatus === "error" && (
          <div className="mb-4 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 p-3">
            위치를 가져올 수 없습니다. 잠시 후 다시 시도하세요.
          </div>
        )}

        <div className="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 text-sm text-gray-700">
          <div className="font-semibold">현위치</div>
          <div>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</div>

          <div className="font-semibold">선택된 장소</div>
          <div className="truncate">{selectedPlace}</div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleUseCurrent}
            className="px-4 h-10 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 active:scale-95 transition"
          >
            {geoStatus === "denied" ? "권한 재시도" : "현위치로"}
          </button>

        {/* 지도에서 선택 버튼은 부모 sdkReady와 무관하게 활성화 */}
          <button
            onClick={() => setOpenMap(true)}
            className="px-4 h-10 rounded-xl bg-[#FF6C43] text-white hover:brightness-110 active:scale-95 transition"
          >
            지도에서 선택
          </button>
        </div>

        <div className="flex items-center justify-end mt-6 gap-2">
          <button
            onClick={onPrev}
            className="px-4 h-10 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 active:scale-95 transition"
          >
            이전
          </button>
          <button
            onClick={() => onNext?.({ coords, selectedPlace })}
            className="px-4 h-10 rounded-xl bg-[#FF6C43] text-white hover:brightness-110 active:scale-95 transition"
          >
            다음
          </button>
        </div>
      </div>

      {openMap && (
        <KakaoMapPickerModal
          initialCenter={coords}
          onClose={() => setOpenMap(false)}
          onPick={handlePickOnMap}
        />
      )}
    </div>
  );
}
