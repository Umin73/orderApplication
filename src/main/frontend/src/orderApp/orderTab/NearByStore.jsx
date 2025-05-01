import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function NearByStore() {

    const navigate = useNavigate();

    const [storeList, setStoreList] = useState([]);
    const [searchText, setSearchText] = useState('');

    const dummyStores = [
        { name: "충정로역점", address: "서울 중구 서소문동", lat: 37.5608, lon: 126.9637 },
        { name: "서대문역점", address: "서울 서대문구 충정로3가", lat: 37.5659, lon: 126.9663 },
        { name: "서울역사점", address: "서울 용산구 동자동", lat: 37.5547, lon: 126.9706 },
        { name: "서울시청점", address: "서울 중구 태평로1가", lat: 37.5642, lon: 126.9770 },
        { name: "광화문점", address: "서울 종로구 세종로", lat: 37.5714, lon: 126.9768 },
        { name: "을지로입구역점", address: "서울 중구 을지로1가", lat: 37.5660, lon: 126.9837 },
        { name: "명동역점", address: "서울 중구 명동2가", lat: 37.5637, lon: 126.9853 },
        { name: "시청역점", address: "서울 중구 정동", lat: 37.5656, lon: 126.9753 },
        { name: "서소문로점", address: "서울 중구 서소문로", lat: 37.5628, lon: 126.9733 },
        { name: "남대문로점", address: "서울 중구 남대문로", lat: 37.5586, lon: 126.9779 },
    ];

    const chungjeongno = { lat: 37.5608, lon: 126.9637 };

    useEffect(() => {
        const sorted = dummyStores
            .map(store => ({
                ...store,
                distance: getDistance(chungjeongno.lat, chungjeongno.lon, store.lat, store.lon)
            }))
            .sort((a, b) => a.distance - b.distance);

        setStoreList(sorted);
    }, []);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const filteredStores = storeList.filter(store =>
        searchText.trim() !== '' && store.name.includes(searchText.trim())
    );

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#eee',
                borderRadius: '8px',
                padding: '6px 10px',
                marginBottom: '10px'
            }}>
                <span role="img" aria-label="search">🔍</span>
                <input
                    type="text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="지점명으로 검색"
                    style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        marginLeft: '8px',
                        outline: 'none',
                        flex: 1,
                        fontSize: '14px'
                    }}
                />
                {searchText && (
                    <button onClick={() => setSearchText('')} style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '18px',
                        cursor: 'pointer'
                    }}>
                        ✖️
                    </button>
                )}
            </div>

            <div style={{padding: '20px'}}>
                {searchText.trim() === "" ? (
                    // 검색어 없을 때 → 전체 매장
                    dummyStores.map((store, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}
                             onClick={() => navigate("/kiosk/order-item-list")}>
                            <strong>{store.name}</strong><br />
                            <span>{store.address}</span><br />
                        </div>
                    ))
                ) : (
                    filteredStores.length > 0 ? (
                        // 검색 결과 있을 때
                        filteredStores.map((store, index) => (
                            <div key={index} style={{ marginBottom: '15px' }} onClick={() => navigate("/kiosk/order-item-list")}>
                                <strong>{store.name}</strong><br />
                                <span>{store.address}</span><br />
                            </div>
                        ))
                    ) : (
                        // 검색했지만 결과 없음
                        <p>검색 결과가 없습니다.</p>
                    )
                )}

            </div>
        </>

    )
        ;
}
