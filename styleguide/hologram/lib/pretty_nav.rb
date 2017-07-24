def prettify_language(language)
  if language == 'css'
    language.upcase
  elsif language =='react'
    language.capitalize
  end
end

def prettify(component)
  component.split('-').map(&:capitalize).join(' ') if component
end

class PrettyNav
  def initialize(nav_hash)
    @nav_hash = nav_hash
  end

  def to_hash
    new_hash = {}
    @nav_hash.each do |language, components|
      pretty_components = {}

      components.each do |component, path|
	      pretty_components[prettify(component)] = path
      end

      pretty_language = prettify_language(language)

      new_hash[pretty_language] = pretty_components
    end

    new_hash
  end
end
