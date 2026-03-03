import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useSettings} from '@shopify/ui-extensions/checkout/preact';

export default function () {
  render(<Extension />, document.body);
}

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// ✅ Replace these with your Shopify Files (CDN) URLs
const PLACEHOLDER_URLS = [
  'https://cdn.shopify.com/s/files/1/0780/7598/6152/files/Trusted.png?v=1772526814',
  'https://cdn.shopify.com/s/files/1/0780/7598/6152/files/Delivery.png?v=1772526841',
  'https://cdn.shopify.com/s/files/1/0780/7598/6152/files/Secure.png?v=1772526893',
];

function Extension() {
  const s = useSettings();

  const heading = asString(s?.heading);

  const urls = [
    asString(s?.img1_url),
    asString(s?.img2_url),
    asString(s?.img3_url),
    asString(s?.img4_url),
    asString(s?.img5_url),
  ].filter(Boolean);

  // ✅ If admin hasn’t set any image URLs yet, show placeholders
  const finalUrls = urls.length > 0 ? urls : PLACEHOLDER_URLS;

  return (
    <s-stack alignContent='start' direction='block' gap="none" justifyContent='start'>
      {finalUrls.map((url, i) => (
        <s-box
          key={i}
          blockSize="100px"
          inlineSize='auto'
          
        >
          <s-image src={url} alt="" aspectRatio='5/1'/>
        </s-box>
      ))}
    </s-stack>
  );
}