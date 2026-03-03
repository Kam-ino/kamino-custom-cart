import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useSettings} from '@shopify/ui-extensions/checkout/preact';

const DEFAULT_TESTIMONIALS = [
  {quote: 'Arrived fast and the quality exceeded expectations.', name: 'Alyssa R.', detail: 'Verified buyer', rating: 5},
  {quote: 'Customer support helped me pick the right size in minutes.', name: 'Marco S.', detail: 'Verified buyer', rating: 4},
  {quote: 'Best purchase this year. Will order again.', name: 'Jules P.', detail: 'Verified buyer', rating: 5},
  {quote: 'Fits perfectly and looks premium.', name: 'Denise K.', detail: 'Verified buyer', rating: 4},
];

export default function () {
  render(<Extension />, document.body);
}

const STAR = 'https://cdn.shopify.com/s/files/1/0780/7598/6152/files/Trustpilot_Star.png?v=1772091259';
const STAR_BLANK = 'https://cdn.shopify.com/s/files/1/0780/7598/6152/files/Trustpilot_Star_Blank.png?v=1772091258';

function StarsImage({rating}) {
  const total = 5;

  return (
    <s-box accessibilityLabel={`${rating} out of ${total} stars`}>
      <s-stack direction="inline" gap="small-500">
        {Array.from({length: total}).map((_, i) => (
          <s-box key={i} inlineSize="20px" blockSize="20px">
            <s-image src={i < rating ? STAR : STAR_BLANK} alt="" />
          </s-box>
        ))}
      </s-stack>
    </s-box>
  );
}

function Extension() {
  const settings = useSettings();

  // Merchant-configurable heading + testimonials (set in shopify.extension.toml [settings])
  const heading = settings?.heading || 'What customers say';

  const testimonials = DEFAULT_TESTIMONIALS.map((t, idx) => {
    const n = idx + 1;
    const quote = settings?.[`t${n}_quote`] || t.quote;
    const name = settings?.[`t${n}_name`] || t.name;
    const detail = settings?.[`t${n}_detail`] || t.detail;

    // Optional: allow overriding rating via settings as a string (e.g. "4")
    const rawRating = settings?.[`t${n}_rating`];
    const rating = rawRating != null && rawRating !== ''
      ? Math.max(0, Math.min(5, Number.parseInt(String(rawRating), 10) || t.rating))
      : t.rating;

    return {quote, name, detail, rating};
  }).filter(t => String(t.quote || '').trim().length > 0);

  const CARD_WIDTH = 260; // tweak to taste

  return (
    <s-stack direction="block" gap="base">
      <s-heading>{heading}</s-heading>

      <s-scroll-box
        overflow="hidden auto"          // block inline  => vertical hidden, horizontal auto
        maxInlineSize="100%"
        padding="base"
        border="base"
        borderRadius="large"
        accessibilityLabel="Customer testimonials"
      >
        <s-grid
          gap="base"
          gridTemplateRows="1fr"
          gridTemplateColumns={`repeat(${testimonials.length}, ${CARD_WIDTH}px)`}
        >
          {testimonials.map((t, i) => (
            <s-box key={i} border="base" borderRadius="base" padding="base">
              <s-stack direction="block" gap="base">
                <StarsImage rating={t.rating} />
                <s-text type="strong">“{t.quote}”</s-text>
                <s-stack direction="inline" justifyContent="space-between" gap="base">
                  <s-text type="small">{t.name}</s-text>
                  <s-text type="small" color="subdued">{t.detail}</s-text>
                </s-stack>
              </s-stack>
            </s-box>
          ))}
        </s-grid>
      </s-scroll-box>
    </s-stack>
  );
}
