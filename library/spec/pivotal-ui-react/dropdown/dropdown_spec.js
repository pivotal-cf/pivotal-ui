import '../spec_helper'
import {Dropdown, DropdownItem} from 'pui-react-dropdowns'

import {findByClass, findAllByClass, clickOn} from '../spec_helper';

describe('Dropdown', () => {
  let subject

  const renderComponent = (props, itemProps) => ReactTestUtils.renderIntoDocument(
    <Dropdown {...props}>
      <DropdownItem {...itemProps}>Item #1</DropdownItem>
    </Dropdown>
  )
  const renderIntoDOM = (props, itemProps) => ReactDOM.render(
    <Dropdown {...props}>
      <DropdownItem {...itemProps}>Item #1</DropdownItem>
    </Dropdown>
  , root)

  beforeEach(() => {
    subject = renderComponent({
      className: 'test-class',
      id: 'test-id',
      style: {opacity: '0.5'},
      title: 'Dropping',
      buttonClassName: 'test-btn-class',
      buttonAriaLabel: 'Nessun Dorma'
    }, {href: 'test'})
  })

  it('passes through className, style, and id to the dropdown', () => {
    const dropdown = findByClass(subject, 'dropdown')
    expect(dropdown).toHaveClass('test-class')
    expect(dropdown).toHaveCss({opacity: '0.5'})
    expect(dropdown).toHaveAttr('id', 'test-id')
  })

  it('correctly styles the dropdown-toggle, and adds a chevron icon', () => {
    const dropdown = findByClass(subject, 'dropdown')
    const toggle = dropdown.querySelector('.dropdown-toggle')
    expect(toggle).toHaveText('Dropping')
    expect(toggle).toHaveClass('test-btn-class')
    expect(toggle).toHaveAttr('aria-haspopup', 'true')
    expect(toggle).toHaveAttr('aria-label', 'Nessun Dorma')

    const icon = dropdown.querySelector('.icon')
    expect(icon.querySelector('.icon-chevron_down')).toExist()
  })

  describe('split dropdown', () => {
    let onSelectSpy
    beforeEach(() => {
      onSelectSpy = jasmine.createSpy('on select')
      subject = renderComponent({
        labelAriaLabel: 'Nessun Dorma',
        href: 'default',
        split: true,
        onSelect: onSelectSpy
      }, {href: 'test'})
    })

    it('renders the dropdown label as an anchor with the provided href', () => {
      const dropdownLabel = findByClass(subject, 'dropdown-label')
      expect(dropdownLabel).toHaveAttr('href', 'default')
      expect(dropdownLabel.tagName).toEqual('A')
    })

    it('sets the labelAriaLabel as the dropdown label aria-label', () => {
      const dropdownLabel = findByClass(subject, 'dropdown-label')
      expect(dropdownLabel).toHaveAttr('aria-label', 'Nessun Dorma')
    })

    it('calls the onSelect callback on selecting the default option', () => {
      clickOn(findByClass(subject, 'dropdown-label'))
      expect(onSelectSpy).toHaveBeenCalled()
    })
  })

  it('calls onClick when dropdown toggle is clicked', () => {
    const onClickSpy = jasmine.createSpy('onClick')
    subject = renderComponent({onClick: onClickSpy})
    const toggle = findByClass(subject, 'dropdown-toggle')

    clickOn(toggle)

    expect(onClickSpy).toHaveBeenCalled()
  })

  it('calls onEntered when opening', () => {
    const onEnteredSpy = jasmine.createSpy('onEntered')
    subject = renderComponent({onEntered: onEnteredSpy})
    const toggle = findByClass(subject, 'dropdown-toggle')

    clickOn(toggle)

    expect(onEnteredSpy).toHaveBeenCalled()
  })

  it('calls onExited when closing', () => {
    const onExitedSpy = jasmine.createSpy('onExited')
    subject = renderComponent({onExited: onExitedSpy})
    const toggle = findByClass(subject, 'dropdown-toggle')

    clickOn(toggle)
    expect(onExitedSpy).not.toHaveBeenCalled()

    clickOn(toggle)
    expect(onExitedSpy).toHaveBeenCalled()
  })

  describe('dropdown menu', () => {
    it('shows the children on click', () => {
      subject = renderComponent()

      expect(findAllByClass(subject, 'dropdown-open')).toHaveLength(0)
      const toggle = findByClass(subject, 'dropdown-toggle')
      clickOn(toggle)

      const dropdown = findByClass(subject, 'dropdown')
      expect(dropdown).toHaveClass('dropdown-open')
      expect(dropdown.querySelector('.dropdown-menu')).toExist()
    })

    it('has an aria-label on the underlying ul', () => {
      subject = renderComponent()
      const toggle = findByClass(subject, 'dropdown-toggle')
      clickOn(toggle)

      const menu = findByClass(subject, 'dropdown-menu')
      expect(menu.querySelector('ul')).toHaveAttr('aria-label', 'submenu')
    })

    describe('when floatMenu is in the props', () => {
      it('renders a floating menu', () => {
        subject = renderComponent({floatMenu: true})
        expect(findByClass(subject, 'dropdown-menu')).toHaveClass('dropdown-menu-float')
      })
    })

    describe('hiding children', () => {
      it('hides when the toggle is clicked', () => {
        const subject = renderComponent()
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)
        clickOn(toggle)
        expect(findAllByClass(subject, 'dropdown-open')).toHaveLength(0)
      })

      it('hides when clicking outside the dropdown', () => {
        const subject = renderComponent()
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)

        const evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true)
        document.documentElement.dispatchEvent(evt)

        expect(findAllByClass(subject, 'dropdown-open')).toHaveLength(0)
      })

      it('hides when a menu item is selected', () => {
        const subject = renderComponent()
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)

        const menu = findByClass(subject, 'dropdown-menu')
        clickOn(menu.querySelector('li'))

        expect(findAllByClass(subject, 'dropdown-open')).toHaveLength(0)
      })

      describe('when scrim is disabled', () => {
        it('does not hide the dropdown menu when clicking outside of the dropdown', () => {
          const subject = renderIntoDOM({disableScrim: true})
          const toggle = findByClass(subject, 'dropdown-toggle')
          clickOn(toggle)

          $('body').click()

          expect(findByClass(subject, 'dropdown-open')).toExist()
        })
      })

      describe('when closeOnMenuClick is false', () => {
        it('does not close when the menu is clicked', () => {
          const subject = renderComponent({closeOnMenuClick: false})
          const toggle = findByClass(subject, 'dropdown-toggle')
          clickOn(toggle)

          const menu = findByClass(subject, 'dropdown-menu')
          clickOn(menu.querySelector('li'))

          expect(findByClass(subject, 'dropdown-open')).toExist()
        })
      })

      describe('when scroll is true', () => {
        it('renders a scrollable menu', () => {
          const subject = renderComponent({scroll: true})
          const toggle = findByClass(subject, 'dropdown-toggle')
          clickOn(toggle)

          const menu = findByClass(subject, 'dropdown-menu')
          expect(menu).toHaveClass('dropdown-menu-scroll')
        })
      })
    })

    describe('when border is provided', () => {
      it('has the border class', () => {
        const subject = renderComponent({border: true})
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)

        const menu = findByClass(subject, 'dropdown-menu')
        expect(menu).toHaveClass('dropdown-border')
      })
    })

    describe('when menuAlign is provided', () => {
      it('can align right', () => {
        const subject = renderComponent({menuAlign: 'right'})
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)

        const menu = findByClass(subject, 'dropdown-menu')
        expect(menu).toHaveClass('dropdown-menu-right')
      })

      it('can align left', () => {
        const subject = renderComponent({menuAlign: 'left'})
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)

        const menu = findByClass(subject, 'dropdown-menu')
        expect(menu).toHaveClass('dropdown-menu-left')
      })

      it('can align none', () => {
        const subject = renderComponent({menuAlign: 'none'})
        const toggle = findByClass(subject, 'dropdown-toggle')
        clickOn(toggle)

        const menu = findByClass(subject, 'dropdown-menu')
        expect(menu).not.toHaveClass('dropdown-menu-right')
        expect(menu).not.toHaveClass('dropdown-menu-left')
      })
    })
  })

  describe('when title is provided', () => {
    describe('when split is false', () => {
      it('puts the title in the dropdown toggle', () => {
        subject = renderComponent({split: false, title: 'Dropping'})
        expect(findAllByClass(subject, 'dropdown-label')).toHaveLength(0)
        expect(findByClass(subject, 'dropdown-toggle')).toHaveText('Dropping')
      })
    })

    describe('when split is true', () => {
      it('puts the title in the dropdown label', () => {
        subject = renderComponent({split: true, title: 'Dropping'})
        expect(findByClass(subject, 'dropdown-label')).toHaveText('Dropping')
      })
    })
  })

  describe('when title is not provided and split is false', () => {
    it('renders an icon-only dropdown', () => {
      subject = renderComponent({split: false})
      expect(findByClass(subject, 'dropdown-icon-only')).toExist()
      const menu = findByClass(subject, 'dropdown-menu')
      expect(menu).toHaveClass('dropdown-menu-float')
    })
  })

  describe('when flat is set in the props', () => {
    it('renders the flat styled dropdown', () => {
      subject = renderComponent({flat: true})
      expect(findByClass(subject, 'dropdown')).toHaveClass('dropdown-flat')
    })
  })

  describe('when showIcon is false', () => {
    it('still renders an icon if there is a title', () => {
      subject = renderComponent({showIcon: false})

      expect(findByClass(subject, 'icon-chevron_down')).toExist()
    })

    it('still renders an icon if the dropdown is a split dropdown', () => {
      subject = renderComponent({showIcon: false, split: true})

      expect(findByClass(subject, 'icon-chevron_down')).toExist()
    })

    it('does not render an icon otherwise', () => {
      subject = renderComponent({showIcon: false, title: 'List of Things'})

      expect(findAllByClass(subject, 'icon')).toHaveLength(0)
      expect(findAllByClass(subject, 'icon-chevron_down')).toHaveLength(0)
    })
  })

  describe('when link prop is true', () => {
    it('adds the dropdown-link class to make everything link colors', () => {
      subject = renderComponent({link: true})
      expect(findByClass(subject, 'dropdown')).toHaveClass('dropdown-link')
    })
  })

  describe('when size is provided', () => {
    it('can be large', () => {
      subject = renderComponent({size: 'large'})
      const toggle = findByClass(subject, 'dropdown-toggle')
      clickOn(toggle)

      expect(findByClass(subject, 'dropdown-lg')).toExist()
    })

    it('can be normal', () => {
      subject = renderComponent({size: 'normal'})
      const toggle = findByClass(subject, 'dropdown-toggle')
      clickOn(toggle)

      expect(findAllByClass(subject, 'dropdown-sm')).toHaveLength(0)
      expect(findAllByClass(subject, 'dropdown-lg')).toHaveLength(0)
    })

    it('can be small', () => {
      subject = renderComponent({size: 'small'})
      const toggle = findByClass(subject, 'dropdown-toggle')
      clickOn(toggle)

      expect(findByClass(subject, 'dropdown-sm')).toExist()
    })
  })

  describe('when icon is provided', () => {
    it('renders the associated svg', () => {
      subject = renderComponent({icon: 'more_vert'})
      const icon = findByClass(subject, 'icon')

      expect(icon.querySelector('.icon-more_vert')).toExist()
    })
  })
})
