require_relative('./navigation')
require_relative('./pretty_nav')

class Title
  def self.from_category(hologram_title)
    nav = NavPath.from_category(hologram_title)

    if nav
      new(
        nav.language,
        nav.component,
      )
    else
      "Pivotal UI: #{prettify(hologram_title)}"
    end
  end

  def initialize(language, component)
    @language = language
    @component = component
  end

  def to_s
    "Pivotal UI #{pretty_language}: #{pretty_component}"
  end

  private

  def pretty_language
    prettify_language(language)
  end

  def pretty_component
    prettify(component)
  end

  attr_reader :language, :component
end
