# thumbnail images
desc "Create thumbs of images"
task :thumbs do
  message = ARGV.last
  task message.to_sym do ; end
  system "cd src/assets/images/inline; sips -Z 720 *.png *.jpg --out thumbs"
  system "cd ../"
  puts "Created thumbnail images."
end
