require_relative('./navigation')

class Title
  def self.from_category(hologram_title)
    nav = NavPath.from_category(hologram_title)

    if nav
      new(
        nav.language,
        nav.component,
      )
    else
      "Pivotal UI: #{hologram_title}"
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
    if language == 'css'
      language.upcase
    elsif language =='react'
      language.capitalize
    end
  end

  def pretty_component
    component.split('-').map(&:capitalize).join(' ')
  end

  attr_reader :language, :component
end
