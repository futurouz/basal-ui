import { render, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import keyboardKey from '@basal-ui/keyboard-keycode'

import Accordion from '../src/Accordion'

expect.extend(toHaveNoViolations)

afterEach(cleanup)

const BaseComponent = (props) => (
  <Accordion {...props}>
    <Accordion.Item value="one">
      <Accordion.Header>
        <Accordion.Button>Header 1</Accordion.Button>
      </Accordion.Header>
      <Accordion.Content>Content 1</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="two">
      <Accordion.Header>
        <Accordion.Button>Header 2</Accordion.Button>
      </Accordion.Header>
      <Accordion.Content>Content 2</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="three">
      <Accordion.Header>
        <Accordion.Button>Header 3</Accordion.Button>
      </Accordion.Header>
      <Accordion.Content>Content 3</Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

/**
 * @internal
 */
function getByTextList(
  texts: string[],
  getByText: (text: string) => HTMLElement
) {
  return texts.map(getByText)
}

it('should have no break accessibility violation', async () => {
  const { container } = render(<BaseComponent type="single" />)
  const results = await axe(container)

  expect(results).toHaveNoViolations()
})

describe('single type', () => {
  it('should not render the accordion content', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const [content1, content2, content3] = getByTextList(
      ['Content 1', 'Content 2', 'Content 3'],
      getByText
    )

    expect(getByText('Header 1')).toBeVisible()
    expect(getByText('Header 2')).toBeVisible()
    expect(getByText('Header 3')).toBeVisible()

    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    expect(content2).not.toBeVisible()
    expect(content2.getAttribute('data-state')).toBe('closed')
    expect(content3).not.toBeVisible()
    expect(content3.getAttribute('data-state')).toBe('closed')
  })

  it('should render the `second` item with `preExpand` props', () => {
    const { getByText } = render(
      <BaseComponent type="single" preExpand="two" />
    )
    const [content1, content2, content3] = getByTextList(
      ['Content 1', 'Content 2', 'Content 3'],
      getByText
    )

    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    expect(content2).toBeVisible()
    expect(content2.getAttribute('data-state')).toBe('open')
    expect(content1).not.toBeVisible()
    expect(content3.getAttribute('data-state')).toBe('closed')
  })

  it('should able to collapse all the items when `allowZeroCollapse=true`', () => {
    const { getByText } = render(
      <BaseComponent type="single" allowZeroCollapse />
    )

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    userEvent.click(header1)
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')
    userEvent.click(header1)
    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
  })

  it('should NOT able to collapse all the items when `allowZeroCollapse=false`', () => {
    const { getByText } = render(
      <BaseComponent type="single" allowZeroCollapse={false} />
    )

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    userEvent.click(header1)
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')
    userEvent.click(header1)
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')
  })
})

describe('multiple type', () => {
  it('should not render the accordion content', () => {
    const { getByText } = render(<BaseComponent type="multiple" />)

    const [content1, content2, content3] = getByTextList(
      ['Content 1', 'Content 2', 'Content 3'],
      getByText
    )

    expect(getByText('Header 1')).toBeVisible()
    expect(getByText('Header 2')).toBeVisible()
    expect(getByText('Header 3')).toBeVisible()
    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    expect(content2).not.toBeVisible()
    expect(content2.getAttribute('data-state')).toBe('closed')
    expect(content3).not.toBeVisible()
    expect(content3.getAttribute('data-state')).toBe('closed')
  })

  it('should render the `second` item with `preExpand` props', () => {
    const { getByText } = render(
      <BaseComponent type="multiple" preExpand={['two', 'three']} />
    )

    const [content1, content2, content3] = getByTextList(
      ['Content 1', 'Content 2', 'Content 3'],
      getByText
    )

    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    expect(content2).toBeVisible()
    expect(content2.getAttribute('data-state')).toBe('open')
    expect(content3).toBeVisible()
    expect(content3.getAttribute('data-state')).toBe('open')
  })

  it('should able to collapse all the items when `allowZeroCollapse=true`', () => {
    const { getByText } = render(
      <BaseComponent type="multiple" allowZeroCollapse />
    )

    const [header1, header2, content1, content2] = getByTextList(
      ['Header 1', 'Header 2', 'Content 1', 'Content 2'],
      getByText
    )

    userEvent.click(header1)
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')
    userEvent.click(header2)
    expect(content2).toBeVisible()
    expect(content2.getAttribute('data-state')).toBe('open')
    userEvent.click(header1)
    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    userEvent.click(header2)
    expect(content2).not.toBeVisible()
    expect(content2.getAttribute('data-state')).toBe('closed')
  })

  it('should NOT able to collapse all the items when `allowZeroCollapse=false`', () => {
    const { getByText } = render(
      <BaseComponent type="multiple" allowZeroCollapse={false} />
    )

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    userEvent.click(header1)
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')
    userEvent.click(header1)
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')
  })
})

describe('focus management', () => {
  it('should have all headers focusable', async () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header1 = getByText('Header 1')
    const header2 = getByText('Header 2')

    header1.focus()
    expect(header1).toHaveFocus()
    header2.focus()
    expect(header2).toHaveFocus()
  })

  it('should expand & hide header with SPACE key', () => {
    const { getByText } = render(
      <BaseComponent type="single" allowZeroCollapse />
    )

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    // TODO: Do we really need to focus this first?
    header1.focus()

    fireEvent.keyDown(header1, { key: keyboardKey.SPACE, keyCode: 32 })
    expect(header1).toHaveFocus()
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')

    fireEvent.keyDown(header1, { key: keyboardKey.SPACE, keyCode: 32 })
    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    expect(header1).toHaveFocus()
  })

  it('should expand & hide header with ENTER key', () => {
    const { getByText } = render(
      <BaseComponent type="single" allowZeroCollapse />
    )

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    // TODO: Do we really need to focus this first?
    header1.focus()

    fireEvent.keyDown(header1, { key: keyboardKey.ENTER, keyCode: 13 })
    expect(header1).toHaveFocus()
    expect(content1).toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('open')

    fireEvent.keyDown(header1, { key: keyboardKey.ENTER, keyCode: 13 })
    expect(content1).not.toBeVisible()
    expect(content1.getAttribute('data-state')).toBe('closed')
    expect(header1).toHaveFocus()
  })

  it('should focus a next header with DOWN ARROW key', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header1 = getByText('Header 1')
    fireEvent.keyDown(header1, {
      key: keyboardKey.DOWN,
      keyCode: 40
    })
    expect(getByText('Header 2')).toHaveFocus()
  })

  it('should focus a previous header with UP ARROW key', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header2 = getByText('Header 2')
    fireEvent.keyDown(header2, {
      key: keyboardKey.UP,
      keyCode: 38
    })
    expect(getByText('Header 1')).toHaveFocus()
  })

  it('should focus the first header with DOWN ARROW key when on the last', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header3 = getByText('Header 3')
    fireEvent.keyDown(header3, {
      key: keyboardKey.DOWN,
      keyCode: 40
    })
    expect(getByText('Header 1')).toHaveFocus()
  })

  it('should focus the last header with DOWN ARROW key when on the first', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header1 = getByText('Header 1')
    fireEvent.keyDown(header1, {
      key: keyboardKey.UP,
      keyCode: 38
    })
    expect(getByText('Header 3')).toHaveFocus()
  })

  it('should focus the first header with HOME key is pressed', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header2 = getByText('Header 2')
    fireEvent.keyDown(header2, {
      key: keyboardKey.HOME,
      keyCode: 36
    })
    expect(getByText('Header 1')).toHaveFocus()
  })

  it('should focus the first header with END key is pressed', () => {
    const { getByText } = render(<BaseComponent type="single" />)

    const header1 = getByText('Header 1')
    fireEvent.keyDown(header1, {
      key: keyboardKey.END,
      keyCode: 35
    })
    expect(getByText('Header 3')).toHaveFocus()
  })
})

describe.skip('controlled Accordion', () => {})

it('should throw en error when pass INVALID accordion type', () => {
  let errorMessage
  try {
    render(<BaseComponent type="invalidType" />)
  } catch (e: any) {
    errorMessage = e.message
  }
  expect(errorMessage).toBe(
    "Invalid Accordion `type` props. It's should be either `single` or `multiple`"
  )
})
