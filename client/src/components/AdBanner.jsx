import { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    try {
      // Push the ad to the adsbygoogle array when the component mounts
      if (window.adsbygoogle && window.adsbygoogle.length === 0) {
        window.adsbygoogle.push({});
      } else if (window.adsbygoogle) {
         window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div style={{ width: '100%', margin: '30px 0', textAlign: 'center', overflow: 'hidden', minHeight: '50px', maxHeight: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* WebifyPro-AutoAds */}
      <ins className="adsbygoogle"
           style={{ display: 'inline-block', width: '100%', height: '100px' }}
           data-ad-client="ca-pub-4371702225315385"
           data-ad-slot="2955354445"
           data-ad-format="horizontal"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdBanner;
