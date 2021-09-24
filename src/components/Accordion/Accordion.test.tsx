import { render, fireEvent, cleanup } from '@testing-library/react'

import Accordion from './Accordion'
import keyboardKey from './keyboardKey'

afterEach(cleanup)

const BaseComponent = ({ type }: { type?: 'single' | 'multiple' }) => (
  <Accordion type={type}>
    <Accordion.Item>
      <Accordion.Header>Header 1</Accordion.Header>
      <Accordion.Content>Content 1</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>Header 2</Accordion.Header>
      <Accordion.Content>Content 2</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>Header 3</Accordion.Header>
      <Accordion.Content>Content 3</Accordion.Content>
    </Accordion.Item>
  </Accordion>
)

it('should render Accordion with test data', () => {
  render(<BaseComponent />)
})

it('should show the headings passed with test data', () => {
  const { getByText } = render(<BaseComponent />)

  expect(getByText('Header 1')).toBeVisible()
  expect(getByText('Header 2')).toBeVisible()
})

it('should be able to close header once opened', () => {
  const { getByText } = render(<BaseComponent />)

  const header1 = getByText('Header 1')

  header1.focus()
  fireEvent.click(header1)
  expect(getByText('Content 1')).toBeVisible()
  fireEvent.click(header1)
  expect(getByText('Content 1')).not.toBeVisible()
  fireEvent.click(header1)
  expect(getByText('Content 1')).toBeVisible()
})

describe('Accessibility', () => {
  it('should have all headers focusable', async () => {
    const { getByText } = render(<BaseComponent />)

    const header1 = getByText('Header 1')
    const header2 = getByText('Header 2')
    header1.focus()
    expect(header1).toHaveFocus()
    header2.focus()
    expect(header2).toHaveFocus()
  })

  it('should expand & hide header with space', () => {
    const { getByText } = render(<BaseComponent />)

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    header1.focus()
    fireEvent.keyDown(header1, { key: keyboardKey.SPACE, keyCode: 32 })
    expect(header1).toHaveFocus()
    expect(content1).toBeVisible()

    fireEvent.keyDown(header1, { key: keyboardKey.SPACE, keyCode: 32 })
    expect(content1).not.toBeVisible()
    expect(header1).toHaveFocus()
  })

  it('should expand & hide header with enter', () => {
    const { getByText } = render(<BaseComponent />)

    const header1 = getByText('Header 1')
    const content1 = getByText('Content 1')

    header1.focus()
    fireEvent.keyDown(header1, { key: keyboardKey.ENTER, keyCode: 13 })
    expect(header1).toHaveFocus()
    expect(content1).toBeVisible()
    fireEvent.keyDown(header1, { key: keyboardKey.ENTER, keyCode: 13 })
    expect(content1).not.toBeVisible()
    expect(header1).toHaveFocus()
  })

  it('should focus a next header with down arrow', () => {
    const { getByText } = render(<BaseComponent />)

    const header1 = getByText('Header 1')
    header1.focus()
    fireEvent.keyDown(header1, {
      key: keyboardKey.DOWN,
      keyCode: 40
    })
    expect(getByText('Header 2')).toHaveFocus()
  })

  it('should focus a previous header with up arrow', () => {
    const { getByText } = render(<BaseComponent />)

    const header2 = getByText('Header 2')
    header2.focus()
    fireEvent.keyDown(header2, {
      key: keyboardKey.UP,
      keyCode: 38
    })
    expect(getByText('Header 1')).toHaveFocus()
  })

  it('should focus the first header with down arrow when on the last', () => {
    const { getByText } = render(<BaseComponent />)

    const header3 = getByText('Header 3')
    header3.focus()
    fireEvent.keyDown(header3, {
      key: keyboardKey.DOWN,
      keyCode: 40
    })
    expect(getByText('Header 1')).toHaveFocus()
  })

  it('should focus the last header with down arrow when on the first', () => {
    const { getByText } = render(<BaseComponent />)

    const header1 = getByText('Header 1')
    header1.focus()
    fireEvent.keyDown(header1, {
      key: keyboardKey.UP,
      keyCode: 38
    })
    expect(getByText('Header 3')).toHaveFocus()
  })

  it('should focus the first header with home is pressed', () => {
    const { getByText } = render(<BaseComponent />)

    const header2 = getByText('Header 2')
    header2.focus()
    fireEvent.keyDown(header2, {
      key: keyboardKey.HOME,
      keyCode: 36
    })
    expect(getByText('Header 1')).toHaveFocus()
  })

  it('should focus the first header with end is pressed', () => {
    const { getByText } = render(<BaseComponent />)

    const header1 = getByText('Header 1')
    header1.focus()
    fireEvent.keyDown(header1, {
      key: keyboardKey.END,
      keyCode: 35
    })
    expect(getByText('Header 3')).toHaveFocus()
  })
})

describe('Uncontrolled Accordion', () => {
  describe('Single type (default)', () => {
    it('should show only 1 content', () => {
      const { getByText } = render(<BaseComponent />)

      const content1 = getByText('Content 1')
      fireEvent.click(getByText('Header 1'))
      expect(content1).toBeVisible()
      fireEvent.click(getByText('Header 2'))
      expect(getByText('Content 2')).toBeVisible()
      expect(content1).not.toBeVisible()
    })
  })

  describe('Multiple type', () => {
    it('should able to show multiple of content', () => {
      const { getByText } = render(<BaseComponent type="multiple" />)

      const content1 = getByText('Content 1')
      fireEvent.click(getByText('Header 1'))
      expect(content1).toBeVisible()
      fireEvent.click(getByText('Header 2'))
      expect(getByText('Content 2')).toBeVisible()
      expect(content1).toBeVisible()
    })
  })
})

describe.skip('controlled Accordion', () => {})
