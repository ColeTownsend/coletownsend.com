require 'rake'
require 'yaml'
require 'fileutils'
require 'rbconfig'

# thumbnail images
desc "Create thumbs of images"
task :thumbs do
  message = ARGV.last
  task message.to_sym do ; end
  system "cd src/assets/images/inline; sips -Z 720 *.png *.jpg --out thumbs"
  system "cd ../"
  puts "Created thumbnail images."
end

SOURCE = "./src"
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
}

# Usage: rake post title="A Title"
require 'time'

desc 'create a new draft post'
task :post do
    title = SOURCE['TITLE']
    slug = "#{Date.today}-#{title.gsub(/[^\w]+/, '-')}"

    file = File.join(
        File.dirname(__FILE__),
        '_posts',
        slug + '.markdown'
    )

    File.open(file, "w") do |f|
        f << <<-EOS.gsub(/^     /, '')
        ---
        layout: portfolio
        date: #{Time.now.strftime('%Y-%m-%d')}
        title: #{title}
        published: false
        home: true
        accent_color: ""
        title-color: ""
        category:
        tags: []
        extra_css:
          image:
            feature: #{title}.jpg
            feature_2x: #{title}@2x.jpg
            thumb: #{title}-thumb.png
            blur: #{title}-blur.jpg
        ---

        EOS
    end

    system ("#{SOURCE['EDITOR']} #{file}")
end
