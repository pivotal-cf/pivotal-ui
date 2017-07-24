class NavPath
  def self.from_category(category)
    match = /(react|css)_(\w*)_([\w\-]*)/.match(category)

    if match
      new(
        match[1],
        match[2],
        match[3]
      )
    end
  end

  def initialize(language, component_type, component)
    @language = language
    @component_type = component_type
    @component = component
  end

  def match?
    language && component_type && component
  end

  attr_reader :language, :component_type, :component
end

def generate_nav_from_categories(categories)
  nav_tree = {}

  categories.each do |category, page|
    nav_path = NavPath.from_category(category)

    if nav_path
      nav_tree[nav_path.language] ||= {}
      nav_tree[nav_path.language][nav_path.component] ||= page
    end
  end

  nav_tree
end
