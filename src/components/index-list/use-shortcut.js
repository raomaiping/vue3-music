import { ref, computed } from 'vue'

export default function useShortcut (props, groupRef) {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })
  const tounch = {}
  function onShortcutTouchStart (e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    tounch.y1 = e.touches[0].pageY
    tounch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    tounch.y2 = e.touches[0].pageY
    const delta = (tounch.y2 - tounch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = tounch.anchorIndex + delta
    scrollTo(anchorIndex)
  }
  function scrollTo (index) {
    if (isNaN(index)) return
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }
  return {
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
    onShortcutTouchMove
  }
}
